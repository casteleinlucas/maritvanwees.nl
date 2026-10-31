<!-- who she is, in her own words, signed off with her motto between two rows of stitching -->
<template>
  <section class="intro" aria-labelledby="intro-title">
    <h2 id="intro-title" class="visually-hidden">Over Marit</h2>
    <div class="measure" data-reveal>
      <p class="lead intro__first">
        Ik ben Marit van Wees, een ondernemende marketing- en salesprofessional met een sterke
        affiniteit met de internationale paardenbranche.
      </p>
      <p>
        Paarden zijn voor mij veel meer dan een hobby. Door mijn jarenlange betrokkenheid bij de
        paardensport begrijp ik de markt, de mensen en de specifieke behoeften die binnen deze
        branche spelen. Die kennis combineer ik met mijn achtergrond in ondernemerschap, marketing
        en sales.
      </p>
      <p>
        Ik denk commercieel, werk strategisch en krijg energie van het ontwikkelen van ideeën die
        bedrijven daadwerkelijk verder helpen. Daarbij kijk ik verder dan alleen zichtbaarheid. Ik
        ben geïnteresseerd in de strategie achter een merk, de behoeften van klanten en de
        commerciële kansen die bijdragen aan duurzame groei.
      </p>
    </div>
    <p class="signoff" lang="en" data-reveal>
      <span>Driven by passion. Focused on progress.</span>
    </p>
  </section>
</template>

<style scoped>
.intro {
  padding: 0 var(--gutter) clamp(4rem, 2.5rem + 5vw, 7rem);
}

/* a drop cap in brass caslon on the opening line */
.intro__first::first-letter {
  float: left;
  margin: 0.07em 0.14em 0 0;
  color: var(--brass-400);
  font-family: var(--font-display);
  font-size: 3.25em;
  line-height: 0.8;
}

.signoff {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  max-width: 46rem;
  margin: clamp(2.75rem, 5vw, 4rem) auto 0;
  color: var(--brass-300);
  font-size: clamp(1.3rem, 1.1rem + 0.9vw, 1.75rem);
  font-style: italic;
  line-height: 1.3;
  text-align: center;
}

.signoff::before,
.signoff::after {
  content: '';
  flex: 1;
  min-width: 1.5rem;
  height: 6px;
  background-color: var(--stitch);
  -webkit-mask: var(--tex-stitch-h) left center / 12px 6px repeat-x;
  mask: var(--tex-stitch-h) left center / 12px 6px repeat-x;
  opacity: 0.8;
}

@media (max-width: 37.49rem) {
  .signoff {
    flex-direction: column;
    gap: 1rem;
  }

  .signoff::before,
  .signoff::after {
    flex: none;
    width: 7.5rem;
  }
}
</style>
