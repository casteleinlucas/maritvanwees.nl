<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import { PROFILE } from '@/constants/profile'

// the page is a saddler's register: a title page, five chapters with roman numerals, photos
// framed as plates, the experience on leather cards and a calling card to close

// there are no pages, so without this every address would answer 200 with the home page.
// error.vue shows the 404. not `fatal`: on the server it renders the error page all the same, and
// a fatal error is logged with its whole stack, which bots probing addresses would fill the logs
// with
if (import.meta.server && useRequestURL().pathname !== '/') {
  throw createError({ statusCode: 404, statusMessage: 'Pagina niet gevonden' })
}

// the page's own address for search engines and shared links
const siteUrl = withoutTrailingSlash(useRuntimeConfig().public.siteUrl)

// who the page is about, for search engines: ties the site to her linkedin when someone
// searches her name
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  url: siteUrl,
  image: `${siteUrl}/og.jpg`,
  description: PROFILE.description,
  jobTitle: PROFILE.jobTitle,
  worksFor: { '@type': 'Organization', name: PROFILE.employer },
  affiliation: { '@type': 'CollegeOrUniversity', name: PROFILE.school },
  sameAs: [PROFILE.linkedin],
}

useHead({
  title: PROFILE.searchTitle,
  link: [{ rel: 'canonical', href: siteUrl }],
  // "terug naar boven" and the monogram link here
  bodyAttrs: { id: 'top' },
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(person) }],
})
useSeoMeta({
  description: PROFILE.description,
  ogType: 'website',
  ogLocale: 'nl_NL',
  ogUrl: siteUrl,
  ogSiteName: PROFILE.name,
  ogTitle: `${PROFILE.name} · ${PROFILE.tagline}`,
  ogDescription: PROFILE.description,
  ogImage: `${siteUrl}/og.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'De naam Marit van Wees met haar tagline, naast een foto van haar met haar paard Co.',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <a class="skip-link" href="#main">Ga naar de inhoud</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <HeroSection />
    <IntroSection />
    <ConnectionChapter />
    <MindsetChapter />
    <ExperienceChapter />
    <WorldChapter />
    <ConnectChapter />
  </main>
  <SiteFooter />
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: 0;
  left: 1rem;
  z-index: 100;
  padding: 0.75rem 1.2rem;
  background: var(--parchment);
  color: var(--ink);
  font-family: var(--font-caps);
  font-size: 0.85rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  transform: translateY(-120%);
}

.skip-link:focus {
  transform: translateY(1rem);
  outline-color: var(--ink);
}

#main:focus {
  outline: none;
}
</style>
