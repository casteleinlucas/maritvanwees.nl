<script setup lang="ts">
import { PHOTOS } from '@/constants/photos'
</script>

<!-- my mindset, on parchment: her view on growth beside a photo of her with co, and the three
     values she works by -->
<template>
  <section
    id="mindset"
    class="chapter mindset seamed"
    tabindex="-1"
    aria-labelledby="mindset-title"
  >
    <ChapterHead
      id="mindset-title"
      tone="light"
      kicker="My Mindset"
      title="Driven to learn. Determined to grow."
    />

    <div class="mindset__body">
      <FramedPlate
        :photo="PHOTOS.forestHand"
        crop="47% 50%"
        sizes="(max-width: 55.99rem) 160vw, 640px"
        data-reveal
      />
      <div class="mindset__text" data-reveal>
        <p class="lead">
          Groei begint voor mij bij de bereidheid om kritisch naar jezelf en je werk te kijken.
        </p>
        <p>
          Ambitie betekent voor mij niet alleen grote doelen stellen, maar ook de
          verantwoordelijkheid nemen om er echt naartoe te werken. Ik neem graag initiatief, ga
          uitdagingen aan en zoek steeds naar manieren om mezelf verder te ontwikkelen.
        </p>
        <p>
          Ik wil niet alleen begrijpen hoe succesvolle bedrijven werken, maar ook welke keuzes,
          strategieën en mensen dat succes mogelijk maken.
        </p>
      </div>
    </div>

    <div class="values" data-reveal>
      <p class="values__intro">Wat mij drijft</p>
      <ul class="values__list">
        <li>Eerlijkheid</li>
        <li>Verantwoordelijkheid</li>
        <li>Ambitie</li>
      </ul>
      <p class="values__outro">
        Die waarden bepalen hoe ik samenwerk, beslissingen neem en mijn toekomst vormgeef.
      </p>
    </div>
  </section>
</template>

<style scoped>
.mindset {
  background:
    var(--tex-grain-soft) 0 0 / 240px 240px,
    var(--mesh-light),
    var(--parchment);
  background-blend-mode: multiply, normal;
  color: var(--ink);
}

/* the seam into the parchment is sewn in brown thread */
.mindset.seamed::before {
  background-image: var(--stitch-h-ink);
}

.mindset__body {
  display: grid;
  gap: 2.5rem;
  justify-items: center;
  align-items: center;
  max-width: 62rem;
  margin: 0 auto;
}

.mindset__body .plate {
  width: min(100%, 24rem);
}

.mindset__text {
  max-width: var(--measure);
}

@media (min-width: 56rem) {
  .mindset__body {
    grid-template-columns: minmax(0, 22rem) minmax(0, var(--measure));
    justify-content: center;
    gap: clamp(3rem, 6vw, 5rem);
  }
}

.values {
  max-width: 46rem;
  margin: clamp(3rem, 6vw, 4rem) auto 0;
  padding-top: clamp(2rem, 4vw, 2.75rem);
  border-top: 1px solid rgba(106, 78, 29, 0.35);
  text-align: center;
}

.values__intro {
  margin-bottom: 1rem;
  color: var(--brass-ink);
  font-family: var(--font-caps);
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.values__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem 1.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 1.2rem + 1vw, 1.9rem);
  line-height: 1.25;
}

.values__list li + li::before {
  content: '·';
  margin-right: 1.6rem;
  color: var(--brass-ink);
}

/* on a phone one value per line, without the dots */
@media (max-width: 37.49rem) {
  .values__list {
    flex-direction: column;
  }

  .values__list li + li::before {
    content: none;
  }
}

.values__outro {
  max-width: var(--measure);
  margin: 1.25rem auto 0;
}
</style>
