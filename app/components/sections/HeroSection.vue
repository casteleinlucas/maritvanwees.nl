<script setup lang="ts">
import { PHOTOS } from '@/constants/photos'
import { PROFILE } from '@/constants/profile'
</script>

<!-- the title page: what she does, her name, the tagline and the way to get in touch, with marit
     and co beneath. on a desktop the photo stands beside it, so she is in the first screen -->
<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__titlepage">
      <ul class="hero__disciplines" lang="en">
        <li v-for="discipline in PROFILE.disciplines" :key="discipline">{{ discipline }}</li>
      </ul>
      <h1 id="hero-title" class="hero__name">
        <span class="hero__first">Marit</span> van&nbsp;Wees
      </h1>
      <p class="hero__tagline" lang="en">{{ PROFILE.tagline }}</p>
      <a class="hero__contact" href="#connect" lang="en">Let’s connect</a>
    </div>

    <FramedPlate
      :photo="PHOTOS.forestBeside"
      shape="hero"
      crop="45% 40%"
      sizes="(max-width: 64rem) 90vw, 26rem"
      eager
    />
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

/* the four disciplines in small caps; they wrap onto a second line on a phone */
.hero__disciplines {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem 1.4rem;
  margin: 0 auto clamp(1.25rem, 2.5vw, 1.75rem);
  padding: 0;
  list-style: none;
  color: var(--brass-400);
  font-family: var(--font-caps);
  font-size: clamp(0.72rem, 0.66rem + 0.25vw, 0.82rem);
  letter-spacing: 0.2em;
  line-height: 1.5;
  text-transform: uppercase;
}

.hero__name {
  color: var(--cream-100);
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 1.5rem + 7.4vw, 8.5rem);
  line-height: 0.98;
  letter-spacing: -0.005em;
}

.hero__tagline {
  margin: clamp(1rem, 2vw, 1.5rem) 0 0;
  color: var(--cream-100);
  font-size: clamp(1.4rem, 1.15rem + 1vw, 2.05rem);
  font-style: italic;
  line-height: 1.3;
}

.hero__contact {
  display: inline-block;
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
  padding: 0.4rem 0 0.25rem;
  border-bottom: 1px solid var(--line);
  color: var(--brass-400);
  font-family: var(--font-caps);
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    color 0.3s ease,
    border-color 0.3s ease;
}

.hero__contact:hover {
  color: var(--brass-300);
  border-color: var(--brass-300);
}

/* desktop: the photo on the left and the title page beside it, the name on two lines, filling
   the first screen under the header (about 5.5rem tall) */
@media (min-width: 64rem) {
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 26rem) minmax(0, 32rem);
    justify-content: center;
    align-content: center;
    align-items: center;
    column-gap: clamp(3rem, 6vw, 6.5rem);
    min-height: calc(100svh - 5.5rem);
    padding-top: clamp(1.5rem, 4vh, 3rem);
    padding-bottom: clamp(3.5rem, 10vh, 6.5rem);
    margin-bottom: clamp(2rem, 4vw, 4rem);
  }

  .hero .plate {
    grid-row: 1;
    grid-column: 1;
    width: 100%;
  }

  .hero__titlepage {
    grid-row: 1;
    grid-column: 2;
    margin: 0;
  }

  .hero__first {
    display: block;
  }

  .hero__name {
    font-size: clamp(4.5rem, 2rem + 4.6vw, 7rem);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .hero__titlepage > * {
    animation: rise 1.3s var(--ease) both;
  }

  .hero__titlepage > :nth-child(2) {
    animation-delay: 0.12s;
  }

  .hero__titlepage > :nth-child(3) {
    animation-delay: 0.3s;
  }

  .hero__titlepage > :nth-child(4) {
    animation-delay: 0.45s;
  }
}
</style>
