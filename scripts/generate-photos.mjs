// Turns the originals in scripts/photos/ into the web versions in public/photos/: every photo
// at a few widths, as avif and webp, for the srcset in FramedPlate.vue. The title page's photo
// also gets an upright 4:5 crop, for the phone and the desktop frontispiece, where only that part
// of it shows. Run `npm run photos` after adding or replacing an original; the widths here must
// match PHOTO_WIDTHS and PORTRAIT_WIDTHS in app/constants/photos.ts.
import { mkdir, readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const SOURCE = 'scripts/photos'
const TARGET = 'public/photos'

const WIDTHS = [640, 960, 1280, 1600]

// the 4:5 crop of the title page's photo: marit and co, cut from x = 22%, its full height
const PORTRAIT = {
  file: 'marit-naast-paard-bos',
  left: 0.22,
  widths: [640, 960],
}

const FORMATS = {
  avif: (image) => image.avif({ quality: 58, effort: 6 }),
  webp: (image) => image.webp({ quality: 78, effort: 6 }),
}

async function write(image, name, width) {
  for (const [extension, encode] of Object.entries(FORMATS)) {
    const out = join(TARGET, `${name}-${width}.${extension}`)
    await encode(image.clone().resize({ width, withoutEnlargement: true })).toFile(out)
  }
}

await rm(TARGET, { recursive: true, force: true })
await mkdir(TARGET, { recursive: true })

for (const original of (await readdir(SOURCE)).filter((name) => name.endsWith('.jpg'))) {
  const name = original.replace(/\.jpg$/, '')
  const image = sharp(join(SOURCE, original)).rotate()
  for (const width of WIDTHS) {
    await write(image, name, width)
  }

  if (name === PORTRAIT.file) {
    const { width, height } = await image.metadata()
    const cropWidth = Math.round((height * 4) / 5)
    const portrait = image.clone().extract({
      left: Math.min(Math.round(width * PORTRAIT.left), width - cropWidth),
      top: 0,
      width: cropWidth,
      height,
    })
    for (const portraitWidth of PORTRAIT.widths) {
      await write(portrait, `${name}-staand`, portraitWidth)
    }
  }

  console.log(`✓ ${name}`)
}
