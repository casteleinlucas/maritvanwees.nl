# maritvanwees.nl

Persoonlijke pagina van Marit van Wees. Eén vast scherm: een geanimeerde handgeschreven naam met
daaronder haar gegevens.

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
| `npm run signature` | naam opnieuw naar SVG-paden omzetten     |

## Structuur

- `app/app.vue` — de pagina
- `app/components/HandwrittenName.vue` — de naam als SVG-lettercontouren, letter voor letter onthuld met CSS
- `app/constants/signature.ts` — de contouren, gegenereerd met `npm run signature` uit `scripts/fonts/` (Mrs Saint Delafield, OFL)
- `app/constants/profile.ts` — naam, functie, locatie, e-mail, LinkedIn
- `app/assets/css/main.css` — kleuren, fonts en de vaste (niet-scrollende) body
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
