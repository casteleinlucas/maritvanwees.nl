<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import { PROFILE } from '@/constants/profile'

// the page is a saddler's register: a title page, five chapters with roman numerals, photos
// framed as plates, the experience on leather cards and a calling card to close

// the page's own address for search engines and shared links
const siteUrl = withoutTrailingSlash(useRuntimeConfig().public.siteUrl)
useHead({
  title: `${PROFILE.name} · ${PROFILE.tagline}`,
  link: [{ rel: 'canonical', href: siteUrl }],
  // "terug naar boven" and the monogram link here
  bodyAttrs: { id: 'top' },
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
  ogImageAlt: 'Marit van Wees in een zonovergoten bos naast haar paard Co.',
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
