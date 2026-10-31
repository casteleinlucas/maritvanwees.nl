export interface Photo {
  // the name in public/photos, served as webp with a jpg of the same name as the fallback
  file: string
  width: number
  height: number
  alt: string
}

// the five photos. the forest shoot ("marit & co") is marit with her own horse co; the arena
// photos are on a bay the texts do not name, so the alt texts don't either
export const PHOTOS = {
  forestBeside: {
    file: 'marit-naast-paard-bos',
    width: 2000,
    height: 1333,
    alt: 'Marit van Wees staat in een zonovergoten bos naast haar paard Co en legt haar hand op de schouder van het paard.',
  },
  forestLeaning: {
    file: 'marit-tegen-paard-bos',
    width: 1600,
    height: 1066,
    alt: 'Marit van Wees leunt glimlachend tegen de hals van haar paard Co in een bos met berken.',
  },
  gallop: {
    file: 'marit-galop-piste',
    width: 2048,
    height: 1366,
    alt: 'Marit van Wees galoppeert lachend op een bruin paard over een zonnige buitenpiste.',
  },
  jump: {
    file: 'marit-sprong-hindernis',
    width: 1884,
    height: 1256,
    alt: 'Marit van Wees springt in wedstrijdkleding met een bruin paard over een hindernis.',
  },
  riding: {
    file: 'marit-rijdend-lachend',
    width: 2048,
    height: 1366,
    alt: 'Marit van Wees lacht in de camera terwijl ze in wedstrijdkleding een bruin paard rijdt.',
  },
} as const satisfies Record<string, Photo>
