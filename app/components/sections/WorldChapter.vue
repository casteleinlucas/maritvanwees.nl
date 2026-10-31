<script setup lang="ts">
import { PHOTOS } from '@/constants/photos'
</script>

<!-- IV. a world i know: the sport photos as a pair of plates, her text as a two-column spread,
     and the line that sums her up on a stitched leather strap across the page -->
<template>
  <section id="world" class="chapter world seamed" aria-labelledby="world-title">
    <ChapterHead
      id="world-title"
      numeral="IV"
      kicker="More than an industry"
      title="A world I know."
    />

    <div class="measure measure--center" data-reveal>
      <p class="lead">
        Mijn kennis van de hippische sector komt niet alleen voort uit mijn professionele ervaring.
        Ik ben zelf actief onderdeel van deze wereld.
      </p>
    </div>

    <div class="diptych">
      <!-- the strong grade tames the bright poles; the photographer's signature stays in view -->
      <FramedPlate :photo="PHOTOS.jump" shape="square" crop="66% 50%" grade="strong" data-reveal />
      <!-- from the top and the left: her head whole, the jump wing with its logo outside -->
      <FramedPlate :photo="PHOTOS.riding" shape="square" crop="20% 0%" grade="warm" data-reveal />
    </div>

    <div class="spread" data-reveal>
      <p>
        Als paardensporter ben ik dagelijks bezig met de opleiding van mijn eigen vijfjarige
        springpaard. Hierdoor ben ik nauw betrokken bij de sport, het trainen en verzorgen van
        paarden en de producten en diensten die daarbij komen kijken.
      </p>
      <p>
        Ik ken de hippische markt niet alleen vanuit een zakelijk perspectief, maar ook als
        consument en paardensporter. Van de dagelijkse praktijk op stal tot de keuzes die ruiters
        maken rondom materiaal, verzorging, training en dienstverlening.
      </p>
      <p>
        Juist die combinatie geeft mij een waardevol inzicht in deze nichemarkt. Ik begrijp de
        doelgroep, herken de behoeften en weet hoe belangrijk vertrouwen, kwaliteit en
        specialistische kennis zijn binnen de paardenbranche.
      </p>
    </div>

    <div class="strap leather" data-reveal>
      <p class="strap__statement" lang="en">
        I don’t just work in the equestrian industry. <em>I’m part of it.</em>
      </p>
    </div>
  </section>
</template>

<style scoped>
.world {
  padding-bottom: 0;
}

.diptych {
  display: grid;
  gap: clamp(2.25rem, 4vw, 3.25rem);
  max-width: 64rem;
  margin: clamp(3rem, 6vw, 4.75rem) auto 0;
}

.diptych .plate {
  width: 100%;
}

@media (min-width: 40rem) {
  .diptych {
    grid-template-columns: 1fr 1fr;
  }
}

/* two columns with a rule between; each paragraph stays whole in its column */
.spread {
  max-width: 62rem;
  margin: clamp(2.5rem, 5vw, 3.75rem) auto 0;
}

.spread p {
  break-inside: avoid;
}

@media (min-width: 48rem) {
  .spread {
    column-count: 2;
    column-gap: clamp(2.5rem, 5vw, 4.5rem);
    column-rule: 1px solid var(--line-soft);
  }
}

.strap {
  margin: var(--space-section) calc(-1 * var(--gutter)) 0;
  padding: clamp(3.25rem, 6vw, 5rem) var(--gutter);
  border-block: 3px solid var(--cognac-900);
  box-shadow:
    inset 0 1px 0 rgba(255, 214, 170, 0.12),
    inset 0 -1px 0 rgba(0, 0, 0, 0.4);
  text-align: center;
}

/* a row of stitching along each edge of the strap */
.strap::after {
  content: '';
  position: absolute;
  top: 12px;
  bottom: 12px;
  left: 0;
  right: 0;
  background-color: var(--stitch);
  -webkit-mask:
    var(--tex-stitch-h) left top / 12px 6px repeat-x,
    var(--tex-stitch-h) left bottom / 12px 6px repeat-x;
  mask:
    var(--tex-stitch-h) left top / 12px 6px repeat-x,
    var(--tex-stitch-h) left bottom / 12px 6px repeat-x;
  pointer-events: none;
}

.strap__statement {
  max-width: 54rem;
  margin: 0 auto;
  color: var(--cream-100);
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 1rem + 3.2vw, 3.5rem);
  line-height: 1.16;
  text-wrap: balance;
}

.strap__statement em {
  color: var(--brass-300);
  font-family: var(--font-text);
  font-style: italic;
  white-space: nowrap;
}
</style>
