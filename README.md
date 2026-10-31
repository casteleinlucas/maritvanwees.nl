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

Via [Coolify](https://coolify.io), met de `Dockerfile` (build pack **Dockerfile**, niet Docker
Compose: het compose-bestand bindt een poort op de host, en die botst met Traefik).

- **Ports Exposes**: `8080`. Het image draait de nitro-server als `node` op `0.0.0.0:8080`.
- **Domein**: `https://maritvanwees.nl`; TLS regelt Coolify.
- **Environment**: niets nodig. `NUXT_PUBLIC_SITE_URL` staat in `nuxt.config.ts` al op de
  productie-origin; alleen een preview-deploy zet hem anders (zie `.env.example`). De pagina wordt
  bij de build geprerenderd, dus de canonical en OG-tags in de html komen uit die default.
- **Healthcheck**: zit in het image (`wget` op `/`). Coolify zet pas verkeer op een nieuwe container
  als die gezond is, dus een deploy die niet opkomt gaat niet live.
- **Build**: `npm ci` en `npm run build` in het image. `@nuxt/fonts` haalt de lettertypes dan bij
  Google op, dus de server heeft bij het bouwen internet nodig.

Compressie (brotli/gzip naast elk bestand), cache-headers en de security-headers (HSTS, CSP,
nosniff, Referrer-Policy, Permissions-Policy) zet de app zelf, in `routeRules` in
`nuxt.config.ts`: onder Coolify staat er alleen Traefik voor, en die voegt ze niet toe.

Lokaal proefdraaien kan met `docker compose up --build`, en dan http://localhost:3000.

`ecosystem.config.cjs` en `server/plugins/pm2-ready.ts` zijn van de eerdere Ploi-opzet (nginx met
PM2 op `127.0.0.1:3002`). In het Docker-image doen ze niets.

CI (`.github/workflows/`): lint + typecheck, een build met een smoke-test (statuscodes en
security-headers), prettier en `npm audit` + gitleaks, op elke PR.
