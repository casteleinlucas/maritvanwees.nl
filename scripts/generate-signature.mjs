// turns the name into the signature: app/constants/signature.ts.
//
// the same way glennbergmans.com does it: text set in a signature font, converted to svg glyph
// outlines once, and for every letter a pen path that a mask follows so the ink appears where
// the pen goes. glenn drew his pen paths by hand; here they are derived: each letter is
// rasterised, thinned to its one-pixel skeleton (zhang-suen), the skeleton is traced into
// strokes in writing order, and those are simplified back into svg paths. run it again after
// changing the name in constants/profile.ts or the font below:
//
//   npm run signature
//
// the font is mrs saint delafield (sil open font license, scripts/fonts/OFL-*.txt), which only
// this script reads; the site never loads it.
import opentype from 'opentype.js'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const FONT = new URL('./fonts/MrsSaintDelafield-Regular.ttf', import.meta.url)
const OUT = new URL('../app/constants/signature.ts', import.meta.url)
const PROFILE = new URL('../app/constants/profile.ts', import.meta.url)
const DEBUG = process.argv[2] // optional: path for an svg that shows the pen paths over the ink

// units are arbitrary: the svg scales to its viewbox
const SIZE = 100
const PADDING = 8
// the pen: wide enough to cover the thickest part of a letter with a little to spare
const PEN_WIDTH = 7
// raster pixels per unit for the skeleton, and the margin round a letter in pixels
const R = 8
const MARGIN = 6
// skeleton branches shorter than this (px) that end in the open are thinning artefacts
const SPUR = 10
// how closely the traced polylines follow the skeleton (px)
const TOLERANCE = 1.2

const text = /name: '([^']+)'/.exec(readFileSync(PROFILE, 'utf8'))?.[1]
if (!text) throw new Error('no name in constants/profile.ts')

const font = opentype.loadSync(fileURLToPath(FONT))
const paths = font.getPaths(text, 0, 0, SIZE, { kerning: true })

// --- rasterising -----------------------------------------------------------------------------

// the outline as polygons (bezier curves flattened), in pixels of the glyph's bitmap
function polygons(path, origin) {
  const polys = []
  let poly = null
  let cx = 0
  let cy = 0
  const px = (x) => (x - origin.x) * R
  const py = (y) => (y - origin.y) * R
  for (const c of path.commands) {
    if (c.type === 'M') {
      poly = [[px(c.x), py(c.y)]]
      polys.push(poly)
      cx = c.x
      cy = c.y
    } else if (c.type === 'L') {
      poly.push([px(c.x), py(c.y)])
      cx = c.x
      cy = c.y
    } else if (c.type === 'C' || c.type === 'Q') {
      const steps = 16
      for (let i = 1; i <= steps; i++) {
        const t = i / steps
        let x
        let y
        if (c.type === 'C') {
          const u = 1 - t
          x = u ** 3 * cx + 3 * u * u * t * c.x1 + 3 * u * t * t * c.x2 + t ** 3 * c.x
          y = u ** 3 * cy + 3 * u * u * t * c.y1 + 3 * u * t * t * c.y2 + t ** 3 * c.y
        } else {
          const u = 1 - t
          x = u * u * cx + 2 * u * t * c.x1 + t * t * c.x
          y = u * u * cy + 2 * u * t * c.y1 + t * t * c.y
        }
        poly.push([px(x), py(y)])
      }
      cx = c.x
      cy = c.y
    }
    // 'Z' closes: the polygon is closed implicitly
  }
  return polys
}

// nonzero-winding scanline fill into a bitmap (Uint8Array, 1 = ink)
function rasterise(polys, width, height) {
  const bits = new Uint8Array(width * height)
  const edges = []
  for (const poly of polys) {
    for (let i = 0; i < poly.length; i++) {
      const [x0, y0] = poly[i]
      const [x1, y1] = poly[(i + 1) % poly.length]
      if (y0 === y1) continue
      edges.push(y0 < y1 ? { x0, y0, x1, y1, dir: 1 } : { x0: x1, y0: y1, x1: x0, y1: y0, dir: -1 })
    }
  }
  for (let row = 0; row < height; row++) {
    const y = row + 0.5
    const hits = []
    for (const e of edges) {
      if (y < e.y0 || y >= e.y1) continue
      hits.push({ x: e.x0 + ((y - e.y0) * (e.x1 - e.x0)) / (e.y1 - e.y0), dir: e.dir })
    }
    hits.sort((a, b) => a.x - b.x)
    let winding = 0
    for (let i = 0; i < hits.length - 1; i++) {
      winding += hits[i].dir
      if (winding === 0) continue
      const from = Math.max(0, Math.ceil(hits[i].x - 0.5))
      const to = Math.min(width - 1, Math.floor(hits[i + 1].x - 0.5))
      for (let col = from; col <= to; col++) bits[row * width + col] = 1
    }
  }
  return bits
}

// --- thinning (zhang-suen) -----------------------------------------------------------------

function thin(bits, width, height) {
  const at = (x, y) => (x < 0 || y < 0 || x >= width || y >= height ? 0 : bits[y * width + x])
  let changed = true
  while (changed) {
    changed = false
    for (const pass of [0, 1]) {
      const remove = []
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (!at(x, y)) continue
          const p2 = at(x, y - 1)
          const p3 = at(x + 1, y - 1)
          const p4 = at(x + 1, y)
          const p5 = at(x + 1, y + 1)
          const p6 = at(x, y + 1)
          const p7 = at(x - 1, y + 1)
          const p8 = at(x - 1, y)
          const p9 = at(x - 1, y - 1)
          const n = [p2, p3, p4, p5, p6, p7, p8, p9]
          const b = n.reduce((s, v) => s + v, 0)
          if (b < 2 || b > 6) continue
          let a = 0
          for (let i = 0; i < 8; i++) if (n[i] === 0 && n[(i + 1) % 8] === 1) a++
          if (a !== 1) continue
          if (pass === 0) {
            if (p2 * p4 * p6 !== 0 || p4 * p6 * p8 !== 0) continue
          } else if (p2 * p4 * p8 !== 0 || p2 * p6 * p8 !== 0) continue
          remove.push(y * width + x)
        }
      }
      for (const i of remove) bits[i] = 0
      if (remove.length) changed = true
    }
  }
  return bits
}

// --- tracing the skeleton into strokes ----------------------------------------------------

const DIRS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
]

function trace(bits, width, height) {
  const at = (x, y) => (x < 0 || y < 0 || x >= width || y >= height ? 0 : bits[y * width + x])
  const key = (x, y) => y * width + x
  // 8-connected, but a diagonal neighbour that is already reached through a straight one is
  // not a link of its own: a thinned line steps in staircases, and counting those would make
  // a node of nearly every pixel
  const neighbours = (x, y) =>
    DIRS.map(([dx, dy]) => [x + dx, y + dy]).filter(([nx, ny]) => {
      if (!at(nx, ny)) return false
      const dx = nx - x
      const dy = ny - y
      if (dx && dy) return !at(x + dx, y) && !at(x, y + dy)
      return true
    })
  const pixels = []
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) if (at(x, y)) pixels.push([x, y])
  if (!pixels.length) return []

  // nodes: endpoints and junctions. everything else is the inside of a segment
  const degree = new Map(pixels.map(([x, y]) => [key(x, y), neighbours(x, y).length]))
  const isNode = (x, y) => degree.get(key(x, y)) !== 2

  // segments between nodes, each traced once
  const seen = new Set()
  const segments = []
  const walk = (sx, sy, nx, ny) => {
    const pts = [[sx, sy]]
    let px = sx
    let py = sy
    let x = nx
    let y = ny
    while (true) {
      pts.push([x, y])
      seen.add(`${px},${py}-${x},${y}`)
      seen.add(`${x},${y}-${px},${py}`)
      if (isNode(x, y)) break
      const next = neighbours(x, y).find(([a, b]) => !(a === px && b === py))
      if (!next) break
      px = x
      py = y
      ;[x, y] = next
      if (x === sx && y === sy) {
        pts.push([x, y])
        break
      }
    }
    return pts
  }
  for (const [x, y] of pixels) {
    if (!isNode(x, y)) continue
    for (const [nx, ny] of neighbours(x, y)) {
      if (seen.has(`${x},${y}-${nx},${ny}`)) continue
      segments.push(walk(x, y, nx, ny))
    }
  }
  // closed loops with no node at all (an o): start anywhere
  for (const [x, y] of pixels) {
    if (isNode(x, y)) continue
    if ([...neighbours(x, y)].some(([nx, ny]) => seen.has(`${x},${y}-${nx},${ny}`))) continue
    const [nx, ny] = neighbours(x, y)[0]
    segments.push(walk(x, y, nx, ny))
  }

  // spurs: short segments hanging in the open are thinning artefacts
  const length = (pts) => {
    let l = 0
    for (let i = 1; i < pts.length; i++)
      l += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
    return l
  }
  const kept = segments.filter((pts) => {
    const open = degree.get(key(...pts[0])) === 1 || degree.get(key(...pts.at(-1))) === 1
    return !(open && length(pts) < SPUR && segments.length > 1)
  })

  // writing order: start at the leftmost open end, keep going where the pen is, and when
  // nothing continues from there, lift the pen to the nearest unwritten stroke
  const strokes = []
  const todo = new Set(kept)
  let cursor = null
  const pick = (seg, atStart) => {
    todo.delete(seg)
    return atStart ? seg : [...seg].reverse()
  }
  while (todo.size) {
    let chosen = null
    if (cursor) {
      for (const seg of todo) {
        if (seg[0][0] === cursor[0] && seg[0][1] === cursor[1]) chosen = pick(seg, true)
        else if (seg.at(-1)[0] === cursor[0] && seg.at(-1)[1] === cursor[1])
          chosen = pick(seg, false)
        if (chosen) break
      }
    }
    if (chosen) {
      strokes.at(-1).push(...chosen.slice(1))
    } else {
      // a new stroke: the leftmost open end first, then whatever is nearest to the pen
      let best = null
      let bestScore = Infinity
      for (const seg of todo) {
        for (const atStart of [true, false]) {
          const end = atStart ? seg[0] : seg.at(-1)
          const isOpen = degree.get(key(...end)) === 1
          const score = cursor
            ? Math.hypot(end[0] - cursor[0], end[1] - cursor[1]) - (isOpen ? 0.5 : 0)
            : // a letter starts at its leftmost open end, and low rather than high: a pen
              // comes in on the baseline (a t's bar is crossed later, as it is by hand)
              end[0] - 0.4 * end[1] + (isOpen ? 0 : 1e6)
          if (score < bestScore) {
            bestScore = score
            best = [seg, atStart]
          }
        }
      }
      chosen = pick(best[0], best[1])
      strokes.push([...chosen])
    }
    cursor = chosen.at(-1)
  }
  return strokes
}

// --- simplifying ---------------------------------------------------------------------------

function simplify(pts, tolerance) {
  if (pts.length < 3) return pts
  const [ax, ay] = pts[0]
  const [bx, by] = pts.at(-1)
  let far = 0
  let index = 0
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i]
    const len = Math.hypot(bx - ax, by - ay)
    const d =
      len === 0
        ? Math.hypot(px - ax, py - ay)
        : Math.abs((bx - ax) * (ay - py) - (ax - px) * (by - ay)) / len
    if (d > far) {
      far = d
      index = i
    }
  }
  if (far <= tolerance) return [pts[0], pts.at(-1)]
  return [
    ...simplify(pts.slice(0, index + 1), tolerance).slice(0, -1),
    ...simplify(pts.slice(index), tolerance),
  ]
}

// --- the glyphs ----------------------------------------------------------------------------

const glyphs = []
for (const [index, path] of paths.entries()) {
  if (!path.commands.length) continue
  const box = path.getBoundingBox()
  const origin = { x: box.x1 - MARGIN / R, y: box.y1 - MARGIN / R }
  const width = Math.ceil((box.x2 - box.x1) * R) + 2 * MARGIN
  const height = Math.ceil((box.y2 - box.y1) * R) + 2 * MARGIN
  const bits = thin(rasterise(polygons(path, origin), width, height), width, height)
  const strokes = trace(bits, width, height).map((pts) => {
    const simple = simplify(pts, TOLERANCE).map(([x, y]) => [
      origin.x + (x + 0.5) / R,
      origin.y + (y + 0.5) / R,
    ])
    let length = 0
    for (let i = 1; i < simple.length; i++)
      length += Math.hypot(simple[i][0] - simple[i - 1][0], simple[i][1] - simple[i - 1][1])
    const d = simple.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join('')
    return { d, length: Math.round(length * 100) / 100 }
  })
  glyphs.push({ char: text[index], d: path.toPathData(2), strokes })
}

const all = glyphs.reduce((box, _, i) => {
  const b = paths.filter((p) => p.commands.length)[i].getBoundingBox()
  return box
    ? {
        x1: Math.min(box.x1, b.x1),
        y1: Math.min(box.y1, b.y1),
        x2: Math.max(box.x2, b.x2),
        y2: Math.max(box.y2, b.y2),
      }
    : b
}, null)
const viewBox = [
  all.x1 - PADDING,
  all.y1 - PADDING,
  all.x2 - all.x1 + 2 * PADDING,
  all.y2 - all.y1 + 2 * PADDING,
]
  .map((n) => Math.round(n * 100) / 100)
  .join(' ')

const out = `// generated by scripts/generate-signature.mjs, do not edit: \`npm run signature\`
//
// the signature: one glyph outline per letter in reading order, set in mrs saint delafield
// at ${SIZE} units, and for each the pen strokes that write it (a mask follows them, see
// HandwrittenName.vue). \`length\` is a stroke's path length, for its dasharray. the text is
// the name in constants/profile.ts.
export interface SignatureStroke {
  d: string
  length: number
}

export interface SignatureGlyph {
  char: string
  d: string
  strokes: SignatureStroke[]
}

export const SIGNATURE = {
  text: ${JSON.stringify(text)},
  viewBox: '${viewBox}',
  penWidth: ${PEN_WIDTH},
  glyphs: [
${glyphs
  .map(
    (g) =>
      `    {\n      char: ${JSON.stringify(g.char)},\n      d: '${g.d}',\n      strokes: [\n${g.strokes
        .map((s) => `        { length: ${s.length}, d: '${s.d}' },`)
        .join('\n')}\n      ],\n    },`,
  )
  .join('\n')}
  ] satisfies SignatureGlyph[],
}
`
writeFileSync(OUT, out)
console.log(
  `${glyphs.length} glyphs, ${glyphs.reduce((n, g) => n + g.strokes.length, 0)} strokes, viewBox ${viewBox}`,
)

if (DEBUG) {
  const ink = glyphs.map((g) => `<path fill="#c8d5cd" d="${g.d}"/>`).join('')
  const pen = glyphs
    .flatMap((g) =>
      g.strokes.map(
        (s, i) =>
          `<path fill="none" stroke="${['#c0392b', '#2980b9', '#27ae60', '#8e44ad'][i % 4]}" stroke-width="1.2" d="${s.d}"/>`,
      ),
    )
    .join('')
  writeFileSync(
    DEBUG,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="1600" height="${Math.round((1600 * 96.6) / 472.5)}"><rect x="-1000" y="-1000" width="3000" height="3000" fill="#fff"/>${ink}${pen}</svg>`,
  )
}
