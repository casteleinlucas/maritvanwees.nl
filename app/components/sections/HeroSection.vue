<script setup lang="ts">
import { PHOTOS } from '@/constants/photos'
import { PROFILE } from '@/constants/profile'

// the four disciplines read as two pairs, so a wrapped line never starts with a lozenge
const DISCIPLINE_PAIRS = [PROFILE.disciplines.slice(0, 2), PROFILE.disciplines.slice(2, 4)]
</script>

<!-- the title page: what she does, her name, the double rule, the tagline and the way to get in
     touch, with marit and co framed beneath. on a desktop the plate stands beside it instead,
     like the frontispiece facing an old register's title page, so she is in the first screen -->
<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__titlepage">
      <p class="hero__disciplines" lang="en">
        <span v-for="(pair, index) in DISCIPLINE_PAIRS" :key="index" class="hero__pair">
          <span>{{ pair[0] }}</span>
          <span class="hero__lozenge" aria-hidden="true" />
          <span>{{ pair[1] }}</span>
        </span>
      </p>
      <h1 id="hero-title" class="hero__name">
        <span class="hero__first">Marit</span> van&nbsp;Wees
      </h1>
      <div class="ornament" aria-hidden="true"><i /></div>
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

/* the four disciplines in engraved caps, a small lozenge between the two of each pair: two
   lines on a phone and beside the frontispiece, one line (a lozenge between the pairs too) on
   a tablet */
.hero__disciplines {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  margin: 0 auto clamp(1.4rem, 3vw, 2.25rem);
  color: var(--brass-400);
  font-family: var(--font-caps);
  font-size: clamp(0.72rem, 0.66rem + 0.25vw, 0.84rem);
  letter-spacing: 0.24em;
  line-height: 1.5;
  text-transform: uppercase;
}

.hero__pair {
  display: inline-flex;
  align-items: center;
  gap: 1.1rem;
  white-space: nowrap;
}

.hero__lozenge,
.hero__pair + .hero__pair::before {
  flex: none;
  width: 5px;
  height: 5px;
  border: 1px solid currentColor;
  transform: rotate(45deg);
}

@media (min-width: 37.5rem) and (max-width: 63.99rem) {
  .hero__disciplines {
    flex-direction: row;
    justify-content: center;
    gap: 1.1rem;
  }

  .hero__pair + .hero__pair::before {
    content: '';
  }
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

/* desktop: the frontispiece, the plate on the left and the title page beside it, the name on
   two lines. it fills the first screen under the header (about 7.5rem tall) and sits in its
   middle, with as much room above as below; the margin keeps the intro at a chapter's distance */
@media (min-width: 64rem) {
  .hero {
    display: grid;
    grid-template-columns: minmax(0, 26rem) minmax(0, 32rem);
    justify-content: center;
    align-content: center;
    align-items: center;
    column-gap: clamp(3rem, 6vw, 6.5rem);
    min-height: calc(100svh - 7.5rem);
    padding-block: clamp(2.5rem, 7vh, 5rem);
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
    animation-name: fade;
    animation-delay: 0.3s;
  }

  .hero__titlepage > :nth-child(4) {
    animation-delay: 0.42s;
  }

  .hero__titlepage > :nth-child(5) {
    animation-delay: 0.6s;
  }

  .hero .ornament::before,
  .hero .ornament::after {
    animation: draw 1.4s var(--ease) 0.45s both;
  }
}
</style>
