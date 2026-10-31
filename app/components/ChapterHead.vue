<script setup lang="ts">
// a chapter's title: a roman numeral between two rules, the english kicker in engraved caps and
// the title in caslon. the kicker and title together are the h2
defineProps<{
  id: string
  numeral: string
  kicker: string
  title: string
}>()
</script>

<template>
  <header class="chapter-head" data-reveal>
    <p class="chapter-head__numeral" aria-hidden="true">{{ numeral }}</p>
    <h2 :id="id" lang="en">
      <span class="chapter-head__kicker">{{ kicker }}</span>
      <span class="chapter-head__title">{{ title }}</span>
    </h2>
  </header>
</template>

<style scoped>
.chapter-head {
  max-width: 54rem;
  margin: 0 auto clamp(2.75rem, 5vw, 4.5rem);
  text-align: center;
}

.chapter-head__numeral {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 0 1.4rem;
  color: var(--brass-400);
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: 0.12em;
  line-height: 1;
}

.chapter-head__numeral::before,
.chapter-head__numeral::after {
  content: '';
  width: 2.75rem;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.chapter-head__kicker {
  display: block;
  margin-bottom: 1.1rem;
  color: var(--brass-400);
  font-family: var(--font-caps);
  font-size: clamp(0.78rem, 0.72rem + 0.25vw, 0.9rem);
  letter-spacing: 0.24em;
  line-height: 1.5;
  text-transform: uppercase;
}

.chapter-head__title {
  display: block;
  color: var(--cream-100);
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 1.35rem + 3.4vw, 4.25rem);
  line-height: 1.06;
  text-wrap: balance;
}
</style>
