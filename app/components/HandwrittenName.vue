<script setup lang="ts">
import { SIGNATURE } from '@/constants/signature'

// the signature, written: the name as glyph outlines (constants/signature.ts, generated from a
// signature font), each letter masked by the pen strokes that write it. a stroke starts fully
// dashed-out and a linear animation runs its dashoffset to zero, so the mask, and with it the
// ink, grows along the pen; the durations are proportional to the strokes' lengths and the
// delays chain, so one pen moves at a steady pace through the whole name. this is how
// glennbergmans.com writes its name, with the pen paths derived instead of drawn by hand.
const props = withDefaults(
  defineProps<{
    // milliseconds the pen takes for the whole name
    duration?: number
    // milliseconds before the pen lands
    delay?: number
  }>(),
  { duration: 2800, delay: 400 },
)

const id = useId()

const glyphs = computed(() => {
  const total = SIGNATURE.glyphs
    .flatMap((glyph) => glyph.strokes)
    .reduce((sum, stroke) => sum + stroke.length, 0)
  const perUnit = props.duration / total
  let at = props.delay
  return SIGNATURE.glyphs.map((glyph, index) => ({
    d: glyph.d,
    mask: `${id}-${index}`,
    strokes: glyph.strokes.map((stroke) => {
      const duration = stroke.length * perUnit
      const timed = { ...stroke, delay: at, duration }
      at += duration
      return timed
    }),
  }))
})
</script>

<template>
  <h1 class="signature">
    <svg
      class="signature__svg"
      :viewBox="SIGNATURE.viewBox"
      role="img"
      :aria-label="SIGNATURE.text"
    >
      <defs>
        <mask v-for="glyph in glyphs" :id="glyph.mask" :key="glyph.mask">
          <path
            v-for="(stroke, index) in glyph.strokes"
            :key="index"
            class="signature__pen"
            :d="stroke.d"
            :stroke-width="SIGNATURE.penWidth"
            :style="{
              // a hair more dash than path, offset a hair past it: with the dash exactly as
              // long as the path, the round cap of the not-yet-drawn dash sits on the start
              // of every stroke as a dot of ink
              strokeDasharray: `${stroke.length} ${stroke.length + 2}`,
              strokeDashoffset: stroke.length + 1,
              animationDuration: `${stroke.duration}ms`,
              animationDelay: `${stroke.delay}ms`,
            }"
          />
        </mask>
      </defs>
      <path
        v-for="glyph in glyphs"
        :key="glyph.mask"
        class="signature__glyph"
        :d="glyph.d"
        :mask="`url(#${glyph.mask})`"
      />
    </svg>
  </h1>
</template>

<style scoped>
.signature {
  margin: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  color: var(--color-ink-signature);
  /* optical centring: the capitals and their flourishes reach high and little hangs low, so
     the ink sits below the middle of its box. lifted by a share of its own height */
  translate: 0 -6%;
}

.signature__svg {
  display: block;
  /* the width the name is shown at: fills a phone, stops well short of the block on a desktop */
  width: min(100%, 40rem);
  overflow: visible;
}

.signature__glyph {
  fill: currentColor;
}

/* the pen: white in the mask is where the ink shows */
.signature__pen {
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: signature-write linear forwards;
}

@keyframes signature-write {
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signature__pen {
    animation: none;
    stroke-dashoffset: 0 !important;
  }
}
</style>
