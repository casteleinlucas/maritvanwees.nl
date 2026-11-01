<script setup lang="ts">
import { PROFILE } from '@/constants/profile'
</script>

<!-- the colophon: one quiet line under the calling card, which already carries the name and the
     monogram -->
<template>
  <footer class="site-footer">
    <p class="site-footer__line">
      <span>{{ PROFILE.name }}</span>
      <span class="site-footer__dot" aria-hidden="true" />
      <span>{{ PROFILE.photoCredit }}</span>
      <span class="site-footer__dot" aria-hidden="true" />
      <a class="site-footer__top" href="#top">Terug naar boven</a>
    </p>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 2.5rem var(--gutter);
  border-top: 1px solid var(--line-soft);
  background: var(--forest-950);
  color: var(--cream-300);
}

.site-footer__line {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.6rem 1.1rem;
  max-width: var(--wide);
  margin: 0 auto;
  font-family: var(--font-caps);
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  line-height: 1.6;
  text-align: center;
  text-transform: uppercase;
}

.site-footer__dot {
  width: 4px;
  height: 4px;
  border: 1px solid var(--brass-400);
  transform: rotate(45deg);
}

.site-footer__top {
  color: var(--brass-400);
  text-decoration: none;
  border-bottom: 1px solid var(--line);
}

.site-footer__top:hover {
  color: var(--brass-300);
  border-color: var(--brass-300);
}

/* on a phone each part on its own line, without the lozenges between */
@media (max-width: 37.49rem) {
  .site-footer__line {
    flex-direction: column;
  }

  .site-footer__dot {
    display: none;
  }
}
</style>
