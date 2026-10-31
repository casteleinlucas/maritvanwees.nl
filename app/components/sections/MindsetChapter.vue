<!-- II. my mindset, printed on parchment like a page of the register: her view on growth, the
     three values between double rules, and what she wants to understand -->
<template>
  <section
    id="mindset"
    class="chapter mindset seamed"
    tabindex="-1"
    aria-labelledby="mindset-title"
  >
    <ChapterHead
      id="mindset-title"
      numeral="II"
      tone="light"
      kicker="My Mindset"
      title="Driven to learn. Determined to grow."
    />

    <div class="measure" data-reveal>
      <p class="lead">
        Ik geloof dat persoonlijke en professionele groei begint bij de bereidheid om kritisch naar
        jezelf en je werk te kijken.
      </p>
      <p>
        Ambitie betekent voor mij niet alleen grote doelen stellen, maar vooral de
        verantwoordelijkheid nemen om daar daadwerkelijk naartoe te werken. Ik ben iemand die graag
        initiatief neemt, uitdagingen aangaat en continu op zoek is naar manieren om zichzelf verder
        te ontwikkelen.
      </p>
    </div>

    <div class="values" data-reveal>
      <p class="values__intro">Mijn belangrijkste drijfveren zijn</p>
      <ul class="values__list">
        <li>Eerlijkheid</li>
        <li>Verantwoordelijkheid</li>
        <li>Ambitie</li>
      </ul>
      <p class="values__outro">
        Deze waarden vormen de basis van hoe ik samenwerk, beslissingen neem en mijn professionele
        toekomst vormgeef.
      </p>
    </div>

    <div class="measure" data-reveal>
      <p class="mindset__closing">
        Ik wil niet alleen begrijpen hoe succesvolle bedrijven werken, maar ook welke keuzes,
        strategieën en mensen bijdragen aan dat succes.
      </p>
    </div>
  </section>
</template>

<style scoped>
.mindset {
  background:
    var(--tex-grain-soft) 0 0 / 240px 240px,
    var(--parchment);
  background-blend-mode: multiply;
  color: var(--ink);
}

/* the seam into the parchment is sewn in brown thread */
.mindset.seamed::before {
  background-image: var(--stitch-h-ink);
}

.values {
  max-width: 60rem;
  margin: clamp(3rem, 6vw, 4.5rem) auto;
  padding: clamp(2.25rem, 4.5vw, 3.25rem) clamp(0.5rem, 3vw, 2.5rem);
  border-block: 3px double rgba(106, 78, 29, 0.5);
  text-align: center;
}

.values__intro {
  margin-bottom: 1.6rem;
  color: var(--brass-ink);
  font-family: var(--font-caps);
  font-size: 0.82rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.values__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.75rem 1.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 1.2rem + 2.2vw, 2.9rem);
  line-height: 1.15;
}

.values__list li {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

.values__list li + li::before {
  content: '';
  flex: none;
  width: 7px;
  height: 7px;
  border: 1px solid var(--brass-ink);
  transform: rotate(45deg);
}

.values__outro {
  max-width: 34rem;
  margin: 1.75rem auto 0;
}

.mindset__closing {
  font-size: 1.18em;
  line-height: 1.5;
  text-align: center;
}

@media (max-width: 59.99rem) {
  .values__list,
  .values__list li {
    flex-direction: column;
    gap: 0.9rem;
  }
}
</style>
