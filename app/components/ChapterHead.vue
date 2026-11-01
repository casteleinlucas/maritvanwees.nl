<script setup lang="ts">
// a chapter's title: the english kicker in small caps and the title in caslon, together the h2.
// `light` is for the chapter on parchment: ink and dark brass instead of cream and brass
withDefaults(
  defineProps<{
    id: string
    kicker: string
    title: string
    tone?: 'dark' | 'light'
  }>(),
  { tone: 'dark' },
)
</script>

<template>
  <header class="chapter-head" :class="`chapter-head--${tone}`" data-reveal>
    <h2 :id="id" lang="en">
      <span class="chapter-head__kicker">{{ kicker }}</span>
      <span class="chapter-head__title">{{ title }}</span>
    </h2>
  </header>
</template>

<style scoped>
.chapter-head {
  max-width: 48rem;
  margin: 0 auto clamp(2.5rem, 5vw, 4rem);
  text-align: center;
}

.chapter-head__kicker {
  display: block;
  margin-bottom: 0.9rem;
  color: var(--brass-400);
  font-family: var(--font-caps);
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  line-height: 1.5;
  text-transform: uppercase;
}

.chapter-head__title {
  display: block;
  color: var(--cream-100);
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 1.4rem + 2.8vw, 3.6rem);
  line-height: 1.08;
  text-wrap: balance;
}

.chapter-head--light .chapter-head__kicker {
  color: var(--brass-ink);
}

.chapter-head--light .chapter-head__title {
  color: var(--ink);
}
</style>
