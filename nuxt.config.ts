// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',

  modules: ['@nuxt/fonts'],

  // flat component names regardless of subfolder: `<HandwrittenName>`, not `<HeroHandwrittenName>`
  components: [{ path: '~/components', pathPrefix: false }],

  // one static page: prerender it so it ships as plain html
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/'],
    },
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
      title: 'Marit van Wees',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'description',
          content: 'Marit van Wees — eigenaar van Vlot Vooruit, Oosterhout (Noord-Brabant).',
        },
        { name: 'theme-color', content: '#deede7' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  fonts: {
    // google provider; @nuxt/fonts generates the @font-face rules with subsetting + preload.
    // the signature itself is not a web font: a fixed svg of pen strokes (constants/signature.ts)
    families: [
      // the details under the signature: a light sans with wide tracking, bold for the title
      { name: 'Lato', provider: 'google', weights: [300, 700] },
    ],
  },
})
