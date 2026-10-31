<script setup lang="ts">
import { PROFILE } from '@/constants/profile'
</script>

<template>
  <footer class="site-footer">
    <Monogram class="site-footer__mark" />
    <p class="site-footer__name">{{ PROFILE.name }}</p>
    <p class="site-footer__tagline" lang="en">{{ PROFILE.tagline }}</p>
    <div class="site-footer__rule" aria-hidden="true" />
    <p class="site-footer__credit">Fotografie: {{ PROFILE.photoCredit }}</p>
    <p><a class="site-footer__top" href="#top">Terug naar boven</a></p>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: clamp(3.5rem, 7vw, 5rem) var(--gutter) 2.75rem;
  border-top: 1px solid var(--line-soft);
  background:
    var(--tex-grain-soft) 0 0 / 240px 240px,
    var(--forest-950);
  background-blend-mode: soft-light;
  color: var(--cream-300);
  text-align: center;
}

.site-footer__mark {
  display: block;
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  color: var(--brass-400);
}

.site-footer__name {
  margin: 0 0 0.2rem;
  color: var(--cream-100);
  font-family: var(--font-display);
  font-size: 1.55rem;
}

.site-footer__tagline {
  font-style: italic;
}

.site-footer__rule {
  width: 8rem;
  height: 5px;
  margin: 1.75rem auto;
  border-block: 1px solid var(--line);
}

.site-footer__credit {
  font-size: 1rem;
}

.site-footer__top {
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.4rem 0 0.25rem;
  border-bottom: 1px solid var(--line);
  color: var(--brass-400);
  font-family: var(--font-caps);
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-decoration: none;
  text-transform: uppercase;
}

.site-footer__top:hover {
  color: var(--brass-300);
  border-color: var(--brass-300);
}
</style>
