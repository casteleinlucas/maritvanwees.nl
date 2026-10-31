// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',

  modules: ['@nuxt/fonts'],

  // flat component names regardless of subfolder: `<HeroSection>`, not `<SectionsHeroSection>`
  components: [{ path: '~/components', pathPrefix: false }],

  // one static page: prerender it so it ships as plain html. robots.txt and the sitemap are
  // server routes; listing them here makes `generate` write them out too
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/', '/robots.txt', '/sitemap.xml'],
    },
    // ship .br and .gz next to every public asset; nitro serves them to browsers that ask
    compressPublicAssets: true,
  },

  routeRules: {
    // the page itself is always revalidated, so a deploy shows at once
    '/': { headers: { 'cache-control': 'no-cache' } },
    // the photos only change with `npm run photos`, which a deploy ships under the same names:
    // a month, not forever
    '/photos/**': { headers: { 'cache-control': 'public, max-age=2592000' } },
  },

  features: {
    // the css comes once, from the stylesheet, instead of also inlined into the html
    inlineStyles: false,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      /**
       * Absolute base for the canonical URL, OG tags, robots.txt and the sitemap. The production
       * origin on purpose: / is prerendered at build time, and the deploy script's build does not
       * see the PM2 env, so the html carries whatever stands here. A preview deploy overrides it
       * with NUXT_PUBLIC_SITE_URL.
       */
      siteUrl: 'https://maritvanwees.nl',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
      // the title, description and share tags are set from constants/profile.ts in app.vue
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // the forest green of the page, so the browser's bar runs into it
        { name: 'theme-color', content: '#12241c' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  fonts: {
    // from google, latin only, with fallbacks measured against georgia so the swap does not move
    // the page. no `provider: 'google'` per family: that would force the provider's own generic
    // `serif` fallback over the one set here
    families: [
      // the name, the chapter titles and the monogram: preloaded, it is the first thing seen
      {
        name: 'Libre Caslon Display',
        weights: [400],
        subsets: ['latin'],
        fallbacks: ['Georgia'],
        preload: true,
      },
      // the text, with its italic for the tagline and the strap
      {
        name: 'EB Garamond',
        weights: [400],
        styles: ['normal', 'italic'],
        subsets: ['latin'],
        fallbacks: ['Georgia'],
      },
      // engraved caps for the labels and the navigation
      {
        name: 'Marcellus SC',
        weights: [400],
        subsets: ['latin'],
        fallbacks: ['Georgia'],
        preload: true,
      },
    ],
  },
})
