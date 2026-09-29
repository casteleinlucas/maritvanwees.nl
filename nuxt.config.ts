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
