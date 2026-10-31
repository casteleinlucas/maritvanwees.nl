<script setup lang="ts">
import { EXPERIENCE } from '@/constants/profile'
</script>

<!-- III. my experience: the register of where she works and studies, on leather cards -->
<template>
  <section id="experience" class="chapter seamed" tabindex="-1" aria-labelledby="experience-title">
    <ChapterHead
      id="experience-title"
      numeral="III"
      kicker="My Experience"
      title="Where passion meets practice."
    />

    <div class="measure measure--center" data-reveal>
      <p class="lead">
        Mijn professionele ervaring ontwikkelt zich op het snijvlak van ondernemerschap, commercie
        en de hippische sector. Door mijn betrokkenheid bij verschillende bedrijven combineer ik
        mijn kennis vanuit mijn opleiding met waardevolle praktijkervaring.
      </p>
    </div>

    <div class="register">
      <RegisterEntry
        v-for="entry in EXPERIENCE"
        :key="entry.name"
        :numeral="entry.numeral"
        :name="entry.name"
        :role="entry.role"
        :text="entry.text"
      />
    </div>
  </section>
</template>

<style scoped>
/* one card per row until there is room for three; one card per row keeps its lines short */
.register {
  display: grid;
  gap: clamp(1.25rem, 2.5vw, 2rem);
  max-width: 34rem;
  margin: clamp(3rem, 6vw, 4.75rem) auto 0;
}

/* the cards share these rows through subgrid (RegisterEntry.vue, same breakpoint) */
@media (min-width: 72rem) {
  .register {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 0;
    max-width: var(--wide);
  }
}
</style>
