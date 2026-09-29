<script setup lang="ts">
// a horse crosses the block, in hoofprints: one pass at a time, each on one of six routes and
// in one of the three gaits, walk, trot and canter (stap, draf, galop), which differ in
// stride, tempo and the pattern the four feet land in. the prints appear where and when a foot
// lands, stay a while, and fade; then the horse comes round again on another route, in the
// next gait. a route is drawn in a 1000 x 1000 box that stretches to the block, so the horse
// takes the same way round on a phone and a monitor. the strides are measured in screen
// pixels along the stretched route, so it does not shorten its step on a small screen.
// timing is css per print; javascript only lays the prints out and starts each pass.

// the six ways across: each skirts the text in the middle of the block
const ROUTES = [
  // in bottom left, along the bottom, up and out on the right
  'M -40 900 C 250 980, 500 900, 700 760 C 900 620, 950 350, 1060 150',
  // in top left, along the top, down and out at the bottom right
  'M -40 100 C 250 30, 500 90, 700 130 C 880 160, 960 600, 1040 1040',
  // in at the top left, down the left side, out at the bottom
  'M 60 -40 C 40 200, 160 500, 120 700 C 100 820, 220 940, 360 1040',
  // in at the bottom right, up the right side, across the top, out top left
  'M 1040 960 C 900 800, 960 500, 900 260 C 860 110, 600 20, -40 60',
  // in at the right, along the bottom, out on the left
  'M 1040 620 C 900 760, 700 900, 500 900 C 300 900, 100 820, -40 640',
  // in at the bottom, up the left of the text, out at the top
  'M 300 1040 C 200 900, 60 700, 100 500 C 130 320, 200 160, 260 -40',
]

// a gait: how long one stride is on the ground (px), how long it takes (ms), and where in it
// each foot lands: `along` px into the stride, `side` of the trail, `at` ms into the stride
interface Footfall {
  along: number
  side: -1 | 1
  at: number
}
interface Gait {
  name: string
  stride: number
  beat: number
  footfalls: Footfall[]
}
const GAITS: Gait[] = [
  // stap: four beats, one foot at a time, even and unhurried
  {
    name: 'stap',
    stride: 120,
    beat: 1500,
    footfalls: [
      { along: 0, side: 1, at: 0 },
      { along: 30, side: -1, at: 375 },
      { along: 60, side: 1, at: 750 },
      { along: 90, side: -1, at: 1125 },
    ],
  },
  // draf: two beats, diagonal pairs landing together, a longer and quicker stride
  {
    name: 'draf',
    stride: 190,
    beat: 820,
    footfalls: [
      { along: 0, side: 1, at: 0 },
      { along: 14, side: -1, at: 0 },
      { along: 95, side: -1, at: 410 },
      { along: 109, side: 1, at: 410 },
    ],
  },
  // galop: three quick beats, the feet bunched, then a moment in the air before the next
  {
    name: 'galop',
    stride: 300,
    beat: 720,
    footfalls: [
      { along: 0, side: -1, at: 0 },
      { along: 34, side: 1, at: 110 },
      { along: 48, side: -1, at: 110 },
      { along: 86, side: 1, at: 220 },
    ],
  },
]

// a print's life once it lands (ms): a moment to appear, a while on the ground, a slow fade
const LIFE = 5200
// the pause between two passes (ms)
const REST = 2600
// px a print sits left or right of the trail: a horse walks on two tracks
const SPREAD = 11

// the print: a hoof seen from above, toe up: a full, rounded print with the narrow cleft of
// the frog cut in from the heels
const HOOF_PATH =
  'M7.2 20.2 C4.2 18.4 2.6 13.6 3.6 9.4 C4.6 5 8 2.6 12 2.6 C16 2.6 19.4 5 20.4 9.4 C21.4 13.6 19.8 18.4 16.8 20.2 C15.8 20.8 14.6 21 14 20.4 C13.5 17 12.8 13.8 12 11.4 C11.2 13.8 10.5 17 10 20.4 C9.4 21 8.2 20.8 7.2 20.2 Z'

interface Print {
  x: number
  y: number
  angle: number
  delay: number
}

const trail = useTemplateRef<HTMLDivElement>('trail')
const prints = ref<Print[]>([])
const pass = ref(0)
const gait = ref('')

// the route stretched to the block, sampled finely so a distance along it in px can be turned
// into a point and a heading
function sampleRoute(route: string, width: number, height: number) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', route)
  const total = path.getTotalLength()
  const steps = 600
  const points: { x: number; y: number; d: number }[] = []
  let d = 0
  for (let i = 0; i <= steps; i++) {
    const p = path.getPointAtLength((i / steps) * total)
    const x = (p.x / 1000) * width
    const y = (p.y / 1000) * height
    const last = points.at(-1)
    if (last) d += Math.hypot(x - last.x, y - last.y)
    points.push({ x, y, d })
  }
  const length = d
  const at = (distance: number) => {
    let lo = 0
    let hi = points.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (points[mid]!.d < distance) lo = mid + 1
      else hi = mid
    }
    const here = points[Math.max(1, lo)]!
    const before = points[Math.max(0, lo - 1)]!
    return { x: here.x, y: here.y, angle: Math.atan2(here.y - before.y, here.x - before.x) }
  }
  return { length, at }
}

function layoutPass(route: string, chosen: Gait): { prints: Print[]; duration: number } {
  const element = trail.value
  if (!element) return { prints: [], duration: 0 }
  const { length, at } = sampleRoute(route, element.clientWidth, element.clientHeight)
  const laid: Print[] = []
  let stride = 0
  for (let start = 0; start < length; start += chosen.stride, stride++) {
    for (const foot of chosen.footfalls) {
      const distance = start + foot.along
      if (distance > length) continue
      const point = at(distance)
      const normal = point.angle + Math.PI / 2
      laid.push({
        x: point.x + Math.cos(normal) * SPREAD * foot.side,
        y: point.y + Math.sin(normal) * SPREAD * foot.side,
        // the hoof's toe points up; turn it to face the direction of travel
        angle: (point.angle * 180) / Math.PI + 90,
        delay: stride * chosen.beat + foot.at,
      })
    }
  }
  const last = laid.at(-1)
  return { prints: laid, duration: last ? last.delay + LIFE : 0 }
}

let timer: ReturnType<typeof setTimeout> | undefined
let routeOrder: number[] = []
let gaitIndex = Math.floor(Math.random() * GAITS.length)

function nextRoute(): string {
  if (routeOrder.length === 0) {
    routeOrder = ROUTES.map((_, i) => i).sort(() => Math.random() - 0.5)
  }
  return ROUTES[routeOrder.pop()!]!
}

function runPass() {
  const chosen = GAITS[gaitIndex % GAITS.length]!
  gaitIndex++
  const laid = layoutPass(nextRoute(), chosen)
  gait.value = chosen.name
  prints.value = laid.prints
  pass.value++
  timer = setTimeout(runPass, laid.duration + REST)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setTimeout(runPass, 1800)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div ref="trail" class="trail" aria-hidden="true" :data-gait="gait">
    <svg class="trail__defs" width="0" height="0">
      <symbol id="hoof" viewBox="0 0 24 24">
        <path :d="HOOF_PATH" />
      </symbol>
    </svg>
    <svg
      v-for="(print, index) in prints"
      :key="`${pass}-${index}`"
      class="trail__print"
      :style="{
        left: `${print.x}px`,
        top: `${print.y}px`,
        '--angle': `${print.angle}deg`,
        animationDelay: `${print.delay}ms`,
      }"
    >
      <use href="#hoof" />
    </svg>
  </div>
</template>

<style scoped>
.trail {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.trail__defs {
  position: absolute;
}

.trail__print {
  position: absolute;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  fill: var(--color-ink);
  opacity: 0;
  transform: rotate(var(--angle)) scale(0.5);
  animation: hoof-life 5200ms linear forwards;
}

/* one print's life: it lands, sits, fades */
@keyframes hoof-life {
  0% {
    opacity: 0;
    transform: rotate(var(--angle)) scale(0.5);
  }
  3% {
    opacity: 0.45;
    transform: rotate(var(--angle)) scale(1);
  }
  55% {
    opacity: 0.45;
  }
  100% {
    opacity: 0;
    transform: rotate(var(--angle)) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .trail {
    display: none;
  }
}
</style>
