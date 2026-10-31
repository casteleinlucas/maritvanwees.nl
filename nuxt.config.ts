// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',

  modules: ['@nuxt/fonts'],

  // flat component names regardless of subfolder: `<HeroSection>`, not `<SectionsHeroSection>`
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
      // the title, description and share tags are set from constants/profile.ts in app.vue
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        // the forest green of the page, so the browser's bar runs into it
        { name: 'theme-color', content: '#12241c' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  fonts: {
    // google provider; @nuxt/fonts generates the @font-face rules with subsetting + preload
    families: [
      // the name, the chapter titles and the monogram
      { name: 'Libre Caslon Display', provider: 'google', weights: [400] },
      // the text, with its italic for the taglines
      {
        name: 'EB Garamond',
        provider: 'google',
        weights: [400, 500],
        styles: ['normal', 'italic'],
      },
      // engraved caps for the labels and the navigation
      { name: 'Marcellus SC', provider: 'google', weights: [400] },
    ],
  },
})
