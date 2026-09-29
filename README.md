# maritvanwees.nl

Persoonlijke pagina van Marit van Wees. Eén vast scherm: een geanimeerde handgeschreven naam met
daaronder haar gegevens.

Gebouwd met [Nuxt 4](https://nuxt.com) (Vue 3), naar het model van simplepark-web-v3.

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| script               | doet                                     |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | dev server met hot reload                |
| `npm run build`      | productiebuild (`.output/`)              |
| `npm run generate`   | statische export (`.output/public/`)     |
| `npm run type-check` | vue-tsc typecheck                        |
| `npm run lint`       | eslint (`lint:fix` repareert)            |
| `npm run format`     | prettier (`format:check` alleen checken) |
| `npm run signature`  | naam opnieuw naar SVG-paden omzetten     |

## Structuur

- `app/app.vue` — de pagina
- `app/components/HandwrittenName.vue` — de naam als SVG-lettercontouren, letter voor letter onthuld met CSS
- `app/constants/signature.ts` — de contouren, gegenereerd met `npm run signature` uit `scripts/fonts/` (Mrs Saint Delafield, OFL)
- `app/constants/profile.ts` — naam, functie, locatie, e-mail, LinkedIn
- `app/assets/css/main.css` — kleuren, fonts en de vaste (niet-scrollende) body
