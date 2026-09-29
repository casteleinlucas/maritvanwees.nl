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

# Public runtime config (NUXT_PUBLIC_*) is injected at runtime by the host or Compose.
CMD ["node", ".output/server/index.mjs"]
