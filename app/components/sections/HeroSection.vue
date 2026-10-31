<script setup lang="ts">
import { PHOTOS } from '@/constants/photos'
import { PROFILE } from '@/constants/profile'
</script>

<!-- the title page: what she does, her name, the double rule, the tagline, and marit with co
     framed beneath -->
<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__titlepage">
      <ul class="hero__disciplines" lang="en">
        <li v-for="discipline in PROFILE.disciplines" :key="discipline">{{ discipline }}</li>
      </ul>
      <h1 id="hero-title" class="hero__name">Marit van&nbsp;Wees</h1>
      <div class="ornament" aria-hidden="true"><i /></div>
      <p class="hero__tagline" lang="en">{{ PROFILE.tagline }}</p>
    </div>

    <FramedPlate :photo="PHOTOS.forestBeside" shape="hero" crop="45% 40%" eager />
  </section>
</template>

<style scoped>
.hero {
  padding: clamp(2rem, 5vw, 4rem) var(--gutter) var(--space-section);
  text-align: center;
}

.hero__titlepage {
  max-width: 64rem;
  margin: 0 auto clamp(2.5rem, 5vw, 4.25rem);
}

/* the four disciplines in engraved caps, a small lozenge between each pair */
.hero__disciplines {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.45rem 1.1rem;
  max-width: 46rem;
  margin: 0 auto clamp(1.4rem, 3vw, 2.25rem);
  padding: 0;
  list-style: none;
  color: var(--brass-400);
  font-family: var(--font-caps);
  font-size: clamp(0.72rem, 0.66rem + 0.25vw, 0.84rem);
  letter-spacing: 0.24em;
  line-height: 1.5;
  text-transform: uppercase;
}

.hero__disciplines li {
  display: inline-flex;
  align-items: center;
  gap: 1.1rem;
  white-space: nowrap;
}

.hero__disciplines li + li::before {
  content: '';
  width: 5px;
  height: 5px;
  border: 1px solid currentColor;
  transform: rotate(45deg);
}

.hero__name {
  color: var(--cream-100);
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 1.5rem + 7.4vw, 8.5rem);
  line-height: 0.98;
  letter-spacing: -0.005em;
}

.hero__tagline {
  margin: 0;
  color: var(--cream-100);
  font-size: clamp(1.4rem, 1.15rem + 1vw, 2.05rem);
  font-style: italic;
  line-height: 1.3;
}

@media (prefers-reduced-motion: no-preference) {
  .hero__titlepage > * {
    animation: rise 1.3s var(--ease) both;
  }

  .hero__titlepage > :nth-child(2) {
    animation-delay: 0.12s;
  }

  .hero__titlepage > :nth-child(3) {
    animation-name: fade;
    animation-delay: 0.3s;
  }

  .hero__titlepage > :nth-child(4) {
    animation-delay: 0.42s;
  }

  .hero .ornament::before,
  .hero .ornament::after {
    animation: draw 1.4s var(--ease) 0.45s both;
  }
}
</style>
