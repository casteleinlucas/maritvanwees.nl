# build stage
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
# nuxt build produces the nitro node server in .output/, with / prerendered into .output/public
RUN npm run build

# production stage: run the nitro node server
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
# Nitro listens on PORT; default to 8080 for local Docker runs.
ENV PORT=8080
ENV HOST=0.0.0.0

# only the build output is needed at runtime (self-contained server + deps)
COPY --from=build --chown=node:node /app/.output ./.output

# drop root for the nitro process
USER node

EXPOSE 8080

# Healthy once the page itself answers. Coolify waits for this before it switches traffic to a new
# container and stops the old one, so a deploy that does not come up never goes live. wget is
# busybox's, already in the alpine image; the shell form lets ${PORT} follow an override.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/" || exit 1

# Public runtime config (NUXT_PUBLIC_*) is injected at runtime by the host or Compose.
CMD ["node", ".output/server/index.mjs"]
