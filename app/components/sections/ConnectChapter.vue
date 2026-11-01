<script setup lang="ts">
import { PHOTOS } from '@/constants/photos'
</script>

<!-- let's connect, on the green of the title page: the invitation, and marit with co at the
     water beside her calling card -->
<template>
  <section id="connect" class="chapter seamed" tabindex="-1" aria-labelledby="connect-title">
    <ChapterHead
      id="connect-title"
      kicker="Let’s Connect"
      title="Connecting passion, people and business."
    />

    <div class="measure measure--center" data-reveal>
      <p>
        Ik kom graag in contact met ondernemers, professionals en andere ambitieuze mensen in de
        hippische sector. Of het nu gaat om kennis uitwisselen, ervaringen delen of mijn netwerk
        uitbreiden: ik sta altijd open voor een interessant gesprek.
      </p>
    </div>

    <div class="connect__pair">
      <FramedPlate
        :photo="PHOTOS.lake"
        crop="55% 50%"
        sizes="(max-width: 55.99rem) 160vw, 640px"
        data-reveal
      />
      <CallingCard />
    </div>
  </section>
</template>

<style scoped>
.connect__pair {
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
  justify-items: center;
  align-items: center;
  max-width: 62rem;
  margin: clamp(3rem, 6vw, 4rem) auto 0;
}

.connect__pair .plate {
  width: min(100%, 24rem);
}

.connect__pair .card {
  width: 100%;
}

@media (min-width: 56rem) {
  .connect__pair {
    grid-template-columns: minmax(0, 22rem) minmax(0, 34rem);
    justify-content: center;
  }
}
</style>
