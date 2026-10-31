<script setup lang="ts">
import { PHOTOS } from '@/constants/photos'
</script>

<!-- V. let's connect, on navy: the invitation, and marit with co beside her calling card -->
<template>
  <section id="connect" class="chapter connect" tabindex="-1" aria-labelledby="connect-title">
    <ChapterHead
      id="connect-title"
      numeral="V"
      kicker="Let’s Connect"
      title="Connecting passion, people and business."
    />

    <div class="measure measure--center" data-reveal>
      <p>
        Ik vind het waardevol om in contact te komen met ondernemers, professionals en andere
        ambitieuze mensen binnen de hippische sector.
      </p>
      <p>
        Of het nu gaat om het uitwisselen van kennis, het delen van ervaringen of het uitbreiden van
        mijn professionele netwerk: ik sta altijd open voor een interessant gesprek.
      </p>
    </div>

    <div class="connect__pair">
      <FramedPlate
        :photo="PHOTOS.forestLeaning"
        crop="58% 50%"
        sizes="(max-width: 37.49rem) 160vw, 720px"
        data-reveal
      />
      <CallingCard />
    </div>
  </section>
</template>

<style scoped>
.connect {
  background:
    var(--tex-grain-soft) 0 0 / 240px 240px,
    var(--navy-800);
  background-blend-mode: soft-light;
}

.connect__pair {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
  justify-items: center;
  align-items: center;
  max-width: 62rem;
  margin: clamp(3rem, 6vw, 4.75rem) auto 0;
}

.connect__pair .plate {
  width: min(100%, 24rem);
}

.connect__pair .card {
  width: 100%;
}

@media (min-width: 56rem) {
  .connect__pair {
    grid-template-columns: minmax(0, 24rem) minmax(0, 34rem);
    justify-content: center;
  }
}
</style>
