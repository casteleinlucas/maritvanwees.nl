<!-- who she is, in her own words, opened with a lead-in in engraved caps and signed off with her
     motto between two rows of stitching -->
<template>
  <section class="intro" aria-labelledby="intro-title">
    <h2 id="intro-title" class="visually-hidden">Over Marit</h2>
    <div class="measure" data-reveal>
      <p class="lead">
        <span class="intro__lead-in">Ik ben Marit van Wees,</span> een ondernemende
        <span class="nowrap">marketing- en salesprofessional</span> met een sterke affiniteit met de
        internationale paardenbranche.
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

/* the opening words in brass engraved caps, as a register's first entry begins */
.intro__lead-in {
  color: var(--brass-300);
  font-family: var(--font-caps);
  font-size: 0.86em;
  letter-spacing: 0.06em;
}

/* the motto, engraved: caps between two rows of stitches, not another italic line */
.signoff {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 48rem;
  margin: clamp(2.75rem, 5vw, 4rem) auto 0;
  color: var(--brass-300);
  font-family: var(--font-caps);
  font-size: clamp(0.85rem, 0.78rem + 0.3vw, 1rem);
  letter-spacing: 0.22em;
  line-height: 1.6;
  text-align: center;
  text-transform: uppercase;
}

.signoff::before,
.signoff::after {
  content: '';
  flex: 1;
  min-width: 1.5rem;
  height: 6px;
  background: var(--stitch-h) 0 50% / 9px 6px space no-repeat;
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
