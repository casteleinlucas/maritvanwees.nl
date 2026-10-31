<script setup lang="ts">
import { PROFILE } from '@/constants/profile'

// how to reach her, as a calling card on linen paper in an engraved double frame. the linkedin
// link shows her name rather than the profile's address, which ends in a string of digits
const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(PROFILE.emailSubject)}`
</script>

<template>
  <div class="card" data-reveal>
    <Monogram class="card__mark" />
    <p class="card__name">{{ PROFILE.name }}</p>
    <p class="card__line" lang="en">Let’s connect and share perspectives.</p>
    <dl class="card__details">
      <div class="card__row">
        <dt>E-mail</dt>
        <dd>
          <a :href="mailto">{{ PROFILE.email }}</a>
        </dd>
      </div>
      <div class="card__row">
        <dt>LinkedIn</dt>
        <dd>
          <a :href="PROFILE.linkedin" target="_blank" rel="noopener noreferrer">{{
            PROFILE.name
          }}</a>
        </dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  isolation: isolate;
  max-width: 34rem;
  padding: clamp(2.75rem, 6vw, 3.75rem) clamp(1.75rem, 5vw, 3.5rem);
  background: var(--parchment);
  color: var(--ink);
  text-align: center;
  box-shadow:
    0 2rem 3.5rem -1.5rem rgba(0, 0, 0, 0.75),
    0 0 0 1px rgba(0, 0, 0, 0.25);
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--tex-linen) 0 0 / 300px 300px;
  mix-blend-mode: multiply;
  opacity: 0.16;
  pointer-events: none;
}

.card::after {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(122, 91, 36, 0.5);
  outline: 1px solid rgba(122, 91, 36, 0.28);
  outline-offset: 3px;
  pointer-events: none;
}

.card__mark {
  display: block;
  width: 78px;
  height: 78px;
  margin: 0 auto 1.25rem;
  color: var(--brass-ink);
}

.card__name {
  margin: 0 0 0.4rem;
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 1.5rem + 1.5vw, 2.5rem);
  line-height: 1.1;
}

.card__line {
  margin: 0 0 1.75rem;
  color: var(--cognac-700);
}

.card__details {
  display: grid;
  gap: 1rem;
  margin: 0;
  padding-top: 1.6rem;
  border-top: 1px solid rgba(122, 91, 36, 0.4);
}

.card__row {
  display: grid;
  gap: 0.1rem;
}

.card__details dt {
  color: var(--brass-ink);
  font-family: var(--font-caps);
  font-size: 0.76rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.card__details dd {
  margin: 0;
  font-size: 1.2rem;
  overflow-wrap: anywhere;
}

.card a {
  position: relative;
  z-index: 1;
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: rgba(122, 91, 36, 0.6);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.22em;
  transition: text-decoration-color 0.3s ease;
}

.card a:hover {
  text-decoration-color: var(--ink);
}

.card a:focus-visible {
  outline-color: var(--ink);
}
</style>
