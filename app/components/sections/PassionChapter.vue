<script setup lang="ts">
import { PHOTOS } from '@/constants/photos'
</script>

<!-- the equestrian connection: how she grew up in the sport with renzo, now trains co herself,
     and why knowing the market from the saddle matters. each horse's part stands beside its own
     photo; the line that sums her up closes the chapter -->
<template>
  <section id="passion" class="chapter seamed" tabindex="-1" aria-labelledby="passion-title">
    <ChapterHead
      id="passion-title"
      kicker="The Equestrian Connection"
      title="A lifelong passion."
    />

    <div class="measure measure--center" data-reveal>
      <p class="lead">
        Paarden zijn voor mij veel meer dan een hobby. De paardenwereld is al jarenlang een
        belangrijk onderdeel van mijn leven.
      </p>
    </div>

    <div class="story">
      <div class="story__row">
        <FramedPlate
          :photo="PHOTOS.jump"
          shape="landscape"
          grade="sport"
          caption="Met Renzo op concours"
          sizes="(max-width: 55.99rem) 90vw, 560px"
          data-reveal
        />
        <div class="story__text" data-reveal>
          <h3 class="story__title">Renzo</h3>
          <p>
            Met Renzo, mijn bruine paard, heb ik de sport echt leren kennen. De trainingen, de
            wedstrijden en alles wat er op stal bij komt kijken: met hem heb ik ervaren wat de
            paardensport van een ruiter vraagt.
          </p>
        </div>
      </div>

      <div class="story__row story__row--flip">
        <FramedPlate
          :photo="PHOTOS.forestLeaning"
          shape="landscape"
          crop="58% 50%"
          caption="Co, mijn vijfjarige springpaard"
          sizes="(max-width: 55.99rem) 90vw, 560px"
          data-reveal
        />
        <div class="story__text" data-reveal>
          <h3 class="story__title">Co</h3>
          <p>
            Nu leid ik mijn eigen vijfjarige springpaard op: Co, mijn schimmel. Daardoor ben ik
            dagelijks bezig met trainen en verzorgen, en met de producten en diensten die daarbij
            horen.
          </p>
        </div>
      </div>
    </div>

    <div class="measure" data-reveal>
      <p>
        Ik ken de hippische markt dus niet alleen vanuit een zakelijk perspectief, maar ook als
        ruiter en als klant. Van de dagelijkse praktijk op stal tot de keuzes die ruiters maken rond
        materiaal, verzorging, training en dienstverlening.
      </p>
      <p>
        Daardoor begrijp ik niet alleen hoe bedrijven hun doelgroep proberen te bereiken, maar ook
        hoe die doelgroep denkt en wat ze verwacht. En ik weet hoe belangrijk vertrouwen, kwaliteit
        en specialistische kennis in deze branche zijn.
      </p>
    </div>

    <blockquote class="statement" lang="en" data-reveal>
      <p>I don’t just work in the equestrian industry. <em>I’m part of it.</em></p>
    </blockquote>
  </section>
</template>

<style scoped>
.story {
  display: grid;
  gap: clamp(3.5rem, 7vw, 5.5rem);
  max-width: 62rem;
  margin: clamp(3.5rem, 7vw, 5.5rem) auto;
}

.story__row {
  display: grid;
  gap: 2rem;
  align-items: center;
}

.story__row .plate {
  width: 100%;
}

.story__text {
  max-width: var(--measure);
}

.story__title {
  margin-bottom: 0.6rem;
  color: var(--cream-100);
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 1.4rem + 1vw, 2.2rem);
  line-height: 1.1;
}

/* side by side, the photo and its text taking turns left and right */
@media (min-width: 56rem) {
  .story__row {
    grid-template-columns: 1.25fr 1fr;
    gap: clamp(2.5rem, 5vw, 4rem);
  }

  .story__row--flip .plate {
    order: 2;
  }
}

.statement {
  max-width: 48rem;
  margin: clamp(4rem, 8vw, 6rem) auto 0;
  padding-top: clamp(2.5rem, 5vw, 3.5rem);
  border-top: 1px solid var(--line-soft);
  color: var(--cream-100);
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 1.1rem + 2.4vw, 3rem);
  line-height: 1.18;
  text-align: center;
  text-wrap: balance;
}

.statement em {
  display: block;
  margin-top: 0.15em;
  color: var(--brass-300);
  font-family: var(--font-text);
  font-style: italic;
}
</style>
