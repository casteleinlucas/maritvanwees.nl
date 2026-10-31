# maritvanwees.nl

Persoonlijke pagina van Marit van Wees, als een register uit een zadelmakerij: een titelpagina en
vijf hoofdstukken (I–V) op bosgroen, navy en cognacleer, foto's ingelijst als platen, haar ervaring
op leren kaarten en een visitekaartje om af te sluiten.

Gebouwd met [Nuxt 4](https://nuxt.com) (Vue 3), naar het model van simplepark-web-v3 en poespasser-web.

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| script              | doet                                     |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | dev server met hot reload                |
| `npm run build`     | productiebuild (`.output/`)              |
| `npm run generate`  | statische export (`.output/public/`)     |
| `npm run typecheck` | vue-tsc typecheck                        |
| `npm run lint`      | eslint (`lint:fix` repareert)            |
| `npm run format`    | prettier (`format:check` alleen checken) |
| `npm run photos`    | foto's opnieuw naar webversies omzetten  |

## Structuur

- `app/app.vue` — de pagina: header, de secties en de footer, plus title en deeltags
- `app/components/sections/` — de titelpagina, de intro en de hoofdstukken I–V
- `app/components/` — de bouwstenen: `FramedPlate` (foto in passe-partout), `ChapterHead`,
  `RegisterEntry` (leren kaart), `CallingCard`, `Monogram`, `SiteHeader` en `SiteFooter`
- `app/constants/profile.ts` — naam, tagline, e-mail, LinkedIn, fotocredit en de ervaring
- `app/constants/photos.ts` — de vijf foto's met alt-teksten. De originelen staan in `scripts/photos/`;
  `npm run photos` maakt er `public/photos/` van, in vier breedtes als avif en webp, plus een staande
  uitsnede van de hoofdfoto. Daarna kiest de browser via `srcset` zelf het kleinste bestand dat past
- `app/plugins/reveal.client.ts` — blokken die bij het scrollen in beeld komen (niet bij reduced motion)
- `app/assets/css/main.css` — kleuren, fonts, texturen en de gedeelde stijlen
- `app/error.vue` — de 404 (elk adres behalve `/`), in dezelfde stijl
- `public/og.jpg` — de deelafbeelding (1200 × 630); `public/apple-touch-icon.png`, `icon-*.png` en
  `site.webmanifest` — het monogram als icoon
- `server/routes/` — `robots.txt` en `sitemap.xml`, gebouwd op `NUXT_PUBLIC_SITE_URL`
- `server/plugins/pm2-ready.ts` — meldt PM2 dat de server luistert (zie hieronder)

## Deploy

Zelfde opzet als poespasser-web: een Ploi-droplet, nginx voor TLS, PM2 voor het proces.

```bash
npm ci
npm run build
pm2 startOrReload ecosystem.config.cjs
```

`ecosystem.config.cjs` draait de nitro-server (`.output/server/index.mjs`) op `127.0.0.1:3002`
(poespasser-web heeft 3000, simplepark-web 3001); de nginx-site in Ploi moet naar die poort
proxyen. `wait_ready` zorgt dat een deploy pas slaagt als dit proces zelf luistert.

De publieke config (`NUXT_PUBLIC_SITE_URL`) staat in het ecosystem-bestand; `.env.example` toont
wat er te zetten is. De pagina zelf wordt bij `npm run build` geprerenderd, dus de canonical en
OG-tags in de html komen uit de default in `nuxt.config.ts`.

Een Docker-image (`Dockerfile`, `docker-compose.yaml`) is er ook, voor lokaal proefdraaien:
`docker compose up --build` en dan http://localhost:3000.

CI (`.github/workflows/`): lint + typecheck, prettier en `npm audit` + gitleaks, op elke PR.
