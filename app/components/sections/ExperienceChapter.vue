<script setup lang="ts">
import { PHOTOS } from '@/constants/photos'
import { EXPERIENCE } from '@/constants/profile'
</script>

<!-- where she works and studies: the lead beside a photo of her on renzo, then three entries side
     by side on a desktop, under one another on a phone, each name linking to the place -->
<template>
  <section
    id="experience"
    class="chapter experience seamed"
    tabindex="-1"
    aria-labelledby="experience-title"
  >
    <ChapterHead
      id="experience-title"
      kicker="My Experience"
      title="Where passion meets practice."
    />

    <div class="opening">
      <FramedPlate
        :photo="PHOTOS.riding"
        shape="landscape"
        crop="20% 0%"
        grade="sport"
        sizes="(max-width: 55.99rem) 90vw, 560px"
        data-reveal
      />
      <p class="lead" data-reveal>
        Mijn ervaring groeit op het snijvlak van ondernemerschap, commercie en de hippische sector.
        Wat ik in mijn opleiding leer, breng ik direct in de praktijk.
      </p>
    </div>

    <ul class="places">
      <li v-for="place in EXPERIENCE" :key="place.name" class="place" data-reveal>
        <h3 class="place__name">
          <a :href="place.url" target="_blank" rel="noopener noreferrer">{{ place.name }}</a>
        </h3>
        <p class="place__role" lang="en">{{ place.role }}</p>
        <p>{{ place.text }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.experience {
  --panel: var(--navy-800);
  --plate-mat: var(--navy-700);
  --plate-ground: var(--navy-900);
}

.opening {
  display: grid;
  gap: 2rem;
  align-items: center;
  max-width: 62rem;
  margin: 0 auto;
}

.opening .plate {
  width: 100%;
}

@media (min-width: 56rem) {
  .opening {
    grid-template-columns: 1.25fr 1fr;
    gap: clamp(2.5rem, 5vw, 4rem);
  }
}

.places {
  display: grid;
  gap: 2.5rem;
  max-width: var(--measure);
  margin: clamp(3rem, 6vw, 4.5rem) auto 0;
  padding: 0;
  list-style: none;
}

.place {
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.place__name {
  color: var(--cream-100);
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 1.35rem + 0.8vw, 1.95rem);
  line-height: 1.15;
}

.place__name a {
  text-decoration: none;
  transition: color 0.3s ease;
}

.place__name a:hover {
  color: var(--brass-300);
}

.place__role {
  margin: 0.5rem 0 1rem;
  color: var(--brass-400);
  font-family: var(--font-caps);
  font-size: 0.76rem;
  letter-spacing: 0.18em;
  line-height: 1.6;
  text-transform: uppercase;
}

@media (min-width: 64rem) {
  .opening {
    display: grid;
    gap: 2rem;
    align-items: center;
    max-width: 62rem;
    margin: 0 auto;
  }

  .opening .plate {
    width: 100%;
  }

  @media (min-width: 56rem) {
    .opening {
      grid-template-columns: 1.25fr 1fr;
      gap: clamp(2.5rem, 5vw, 4rem);
    }
  }

  .places {
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(2rem, 4vw, 3.5rem);
    max-width: var(--wide);
  }
}
</style>
