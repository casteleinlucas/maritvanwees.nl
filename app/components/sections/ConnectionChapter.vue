<script setup lang="ts">
import { PHOTOS } from '@/constants/photos'
</script>

<!-- I. the equestrian connection: text, a plate, text -->
<template>
  <section id="connection" class="chapter seamed" tabindex="-1" aria-labelledby="connection-title">
    <ChapterHead
      id="connection-title"
      numeral="I"
      kicker="The Equestrian Connection"
      title="A lifelong passion."
    />

    <div class="triptych">
      <div class="triptych__left" data-reveal>
        <p class="lead">
          De paardenwereld is al jarenlang een belangrijk onderdeel van mijn leven.
        </p>
        <p>
          Als actieve paardensporter ben ik dagelijks betrokken bij alles wat er binnen de sport
          speelt. Van training en paardenmanagement tot de producten, diensten en ontwikkelingen
          binnen de hippische markt.
        </p>
      </div>

      <!-- cropped from the top, so her head stays whole and the sponsor banner falls outside -->
      <FramedPlate
        :photo="PHOTOS.gallop"
        crop="42% 0%"
        grade="sport"
        sizes="(max-width: 37.49rem) 160vw, 900px"
        data-reveal
      />

      <div class="triptych__right" data-reveal>
        <p>
          Die betrokkenheid geeft mij een waardevol perspectief op de branche. Ik begrijp niet
          alleen hoe bedrijven hun doelgroep proberen te bereiken, maar ook hoe die doelgroep denkt,
          welke verwachtingen er zijn en welke factoren een rol spelen bij aankoopbeslissingen.
        </p>
        <p>
          Voor mij komen hier twee werelden samen: mijn passie voor paarden en mijn ambitie om
          mezelf zakelijk te blijven ontwikkelen.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.triptych {
  display: grid;
  gap: clamp(2.5rem, 5vw, 3.5rem);
  justify-items: center;
  max-width: var(--wide);
  margin: 0 auto;
}

.triptych__left,
.triptych__right {
  max-width: var(--measure);
}

/* tablet: the plate on top, the two texts side by side beneath it */
@media (min-width: 48rem) and (max-width: 71.99rem) {
  .triptych {
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
    align-items: start;
  }

  .triptych .plate {
    grid-column: 1 / -1;
    grid-row: 1;
  }

  .triptych__left {
    grid-row: 2;
    grid-column: 1;
  }

  .triptych__right {
    grid-row: 2;
    grid-column: 2;
  }
}

@media (min-width: 72rem) {
  .triptych {
    grid-template-columns: 1fr minmax(22rem, 30rem) 1fr;
    column-gap: clamp(2.5rem, 4.5vw, 4.5rem);
    align-items: center;
  }
}
</style>
