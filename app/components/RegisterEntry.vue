<script setup lang="ts">
// one entry of the experience register: a leather card with a stitched border inset like the
// edge of a saddle flap
defineProps<{
  numeral: string
  name: string
  role: string
  text: string
}>()
</script>

<template>
  <article class="entry leather" data-reveal>
    <p class="entry__numeral" aria-hidden="true">{{ numeral }}</p>
    <h3 class="entry__name">{{ name }}</h3>
    <p class="entry__role" lang="en">{{ role }}</p>
    <p class="entry__text">{{ text }}</p>
  </article>
</template>

<style scoped>
.entry {
  padding: clamp(2.5rem, 4vw, 3.1rem) clamp(1.6rem, 3vw, 2.4rem) clamp(2.25rem, 3.5vw, 2.75rem);
  border-radius: 3px;
  box-shadow:
    inset 0 1px 0 rgba(255, 214, 170, 0.1),
    0 0 0 1px var(--cognac-900),
    0 1.75rem 2.5rem -1.5rem rgba(0, 0, 0, 0.65);
  text-align: center;
}

.entry::after {
  content: '';
  position: absolute;
  inset: 10px;
  background-color: var(--stitch);
  -webkit-mask:
    var(--tex-stitch-h) left top / 12px 6px repeat-x,
    var(--tex-stitch-h) left bottom / 12px 6px repeat-x,
    var(--tex-stitch-v) left top / 6px 12px repeat-y,
    var(--tex-stitch-v) right top / 6px 12px repeat-y;
  mask:
    var(--tex-stitch-h) left top / 12px 6px repeat-x,
    var(--tex-stitch-h) left bottom / 12px 6px repeat-x,
    var(--tex-stitch-v) left top / 6px 12px repeat-y,
    var(--tex-stitch-v) right top / 6px 12px repeat-y;
  pointer-events: none;
}

.entry__numeral {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  margin: 0 auto 1.25rem;
  border: 1px solid rgba(220, 192, 138, 0.6);
  border-radius: 50%;
  color: var(--brass-300);
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1;
}

.entry__name {
  color: var(--cream-100);
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 1.35rem + 1.1vw, 2.15rem);
  line-height: 1.12;
  text-wrap: balance;
}

.entry__role {
  margin: 0.95rem 0 1.4rem;
  color: var(--brass-300);
  font-family: var(--font-caps);
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  line-height: 1.6;
  text-transform: uppercase;
}

.entry__role::after {
  content: '';
  display: block;
  width: 3.5rem;
  height: 4px;
  margin: 1.1rem auto 0;
  border-block: 1px solid rgba(220, 192, 138, 0.55);
}

.entry__text {
  text-align: left;
}
</style>
