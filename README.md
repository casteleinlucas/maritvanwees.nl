# maritvanwees.nl

Source of [maritvanwees.nl](https://maritvanwees.nl), the personal website of Marit van Wees.

Built with [Nuxt 4](https://nuxt.com) (Vue 3) and TypeScript.

## Getting started

Requires the Node version in `.nvmrc`.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script              | Description                                    |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server with hot reload           |
| `npm run build`     | Build for production (`.output/`)              |
| `npm run generate`  | Export a static site (`.output/public/`)       |
| `npm run typecheck` | Type-check with vue-tsc                        |
| `npm run lint`      | Lint with ESLint (`lint:fix` to fix)           |
| `npm run format`    | Format with Prettier (`format:check` to check) |
| `npm run signature` | Regenerate the handwritten name as SVG paths   |

## Project structure

- `app/` — pages, components, styles and content
- `app/constants/` — site content and generated assets (e.g. the signature paths)
- `public/` — static files such as the favicon and the social share image
- `server/` — `robots.txt`, `sitemap.xml` and server plugins
- `scripts/` — build-time helpers and the fonts they use

## Configuration

Copy `.env.example` to `.env` and adjust as needed. `NUXT_PUBLIC_SITE_URL` sets the base URL used
for canonical links, Open Graph tags, the sitemap and `robots.txt`.

## Deployment

The site is deployed with [Coolify](https://coolify.io) using the Docker Compose build pack and
`docker-compose.coolify.yml`. The container runs the Node server on port 8080, so the domains in
Coolify include that port (`http://maritvanwees.nl:8080`).

To try a production build locally with Docker:

```bash
docker compose up --build    # http://localhost:3000
```

## CI

GitHub Actions run linting, type-checking, formatting checks and security scans on every pull request.
