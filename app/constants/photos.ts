// the widths every photo is published at, as avif and webp (scripts/generate-photos.mjs makes
// them from the originals in scripts/photos/; keep the two lists the same)
export const PHOTO_WIDTHS = [640, 960, 1280, 1600] as const
// the title page's photo also comes as an upright 4:5 crop, at these widths
export const PORTRAIT_WIDTHS = [640, 960] as const

export interface Photo {
  // the name in public/photos, before `-<width>.<avif|webp>`
  file: string
  // the original's size, for the img's width and height (its aspect ratio)
  width: number
  height: number
  alt: string
}

// the seven photos. the forest shoot ("marit & co") is marit with co, her young grey she is training
// herself; the arena photos are on renzo, the bay she competed with before
export const PHOTOS = {
  forestBeside: {
    file: 'marit-naast-paard-bos',
    width: 2000,
    height: 1333,
    alt: 'Marit van Wees staat in een zonovergoten bos naast haar witte paard Co en legt haar hand op zijn schouder.',
  },
  forestLeaning: {
    file: 'marit-tegen-paard-bos',
    width: 2100,
    height: 1400,
    alt: 'Marit van Wees leunt glimlachend tegen de hals van haar witte paard Co in een bos met berken.',
  },
  forestHand: {
    file: 'marit-hand-op-paard-bos',
    width: 2400,
    height: 1600,
    alt: 'Marit van Wees staat lachend in een bos naast haar witte paard Co en legt haar hand op zijn hoofd.',
  },
  lake: {
    file: 'marit-paard-water',
    width: 2200,
    height: 1467,
    alt: 'Marit van Wees staat bij zonsondergang aan het water met haar witte paard Co, haar arm om zijn hals.',
  },
  gallop: {
    file: 'marit-galop-piste',
    width: 2048,
    height: 1366,
    alt: 'Marit van Wees galoppeert lachend op haar bruine paard Renzo over een zonnige buitenpiste.',
  },
  jump: {
    file: 'marit-sprong-hindernis',
    width: 1884,
    height: 1256,
    alt: 'Marit van Wees springt in wedstrijdkleding met haar bruine paard Renzo over een hindernis.',
  },
  riding: {
    file: 'marit-rijdend-lachend',
    width: 2048,
    height: 1366,
    alt: 'Marit van Wees lacht in de camera terwijl ze in wedstrijdkleding haar bruine paard Renzo rijdt.',
  },
} as const satisfies Record<string, Photo>
