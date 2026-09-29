<script setup lang="ts">
import { PROFILE } from '@/constants/profile'

// the intro: the name alone, centred, being written; then the details rise from below and
// push it up to its place. the details wait for the pen: this is the signature's timing
const SIGNATURE = { delay: 400, duration: 2800 }
const detailsAt = `${SIGNATURE.delay + SIGNATURE.duration}ms`
</script>

<template>
  <main class="page">
    <!-- the block: a rounded mint panel filling the page, carrying the wash, the hoof trail
         and everything on it -->
    <div class="block" :style="{ '--details-at': detailsAt }">
      <div class="block__decor" aria-hidden="true">
        <span class="block__wash" />
        <span class="block__grain" />
      </div>

      <HoofTrail />

      <div class="page__content">
        <HandwrittenName
          :text="PROFILE.name"
          :delay="SIGNATURE.delay"
          :duration="SIGNATURE.duration"
        />

        <!-- the details: closed (no height) while the name is written, then they open from
             below, which moves the centred block, and the name with it, up -->
        <div class="details">
          <div class="details__inner">
            <p class="details__title">{{ PROFILE.tagline }}</p>
            <p class="details__about">{{ PROFILE.about }}</p>

            <ul class="details__links">
              <li>
                <a class="details__link" :href="`mailto:${PROFILE.email}`">
                  <svg class="details__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  {{ PROFILE.email }}
                </a>
              </li>
              <li>
                <a
                  class="details__link"
                  :href="PROFILE.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg class="details__icon" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- the foot of the block: closes it off, like a letterhead's bottom line -->
      <footer class="foot">
        <span>{{ PROFILE.location }}</span>
        <span class="foot__dot" aria-hidden="true" />
        <span>&copy; {{ new Date().getFullYear() }} {{ PROFILE.name }}</span>
      </footer>
    </div>
  </main>
</template>

<style scoped>
.page {
  height: 100%;
  /* the plain ground shows as a rim round the block; on notched phones it clears the corners */
  padding: var(--spacing-16);
  padding-bottom: max(var(--spacing-16), env(safe-area-inset-bottom));
}

.block {
  position: relative;
  z-index: 0;
  isolation: isolate;
  height: 100%;
  display: grid;
  place-items: center;
  /* the same room top and bottom, so the name alone sits dead centre before the details open;
     the bottom's doubles as the foot's room */
  padding: var(--spacing-60) var(--spacing-24);
  background: var(--color-block-background);
  border-radius: var(--rounding-24);
  overflow: hidden;
}

@media (min-width: 48rem) {
  .page {
    padding: var(--spacing-24);
  }

  .block {
    border-radius: var(--rounding-48);
  }
}

.block__decor {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}

/* the wash: pools of deeper and lighter mint on a square wider than the block, blurred so they
   have no edges, turning slowly round the block's centre. a square of 150% of the width covers
   the corners in every rotation as long as the block is not taller than wide; on a phone it
   is, so the square is sized on the larger side (see below) */
.block__wash {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  aspect-ratio: 1;
  background:
    radial-gradient(30% 34% at 66% 62%, var(--color-mesh-deep) 0%, transparent 100%),
    radial-gradient(22% 26% at 38% 72%, var(--color-mesh-moss) 0%, transparent 100%),
    radial-gradient(26% 30% at 30% 34%, var(--color-mesh-light) 0%, transparent 100%),
    radial-gradient(24% 28% at 70% 30%, var(--color-mesh-teal) 0%, transparent 100%),
    radial-gradient(20% 22% at 50% 50%, var(--color-mesh-sage) 0%, transparent 100%);
  filter: blur(40px);
  translate: -50% -50%;
  animation: mesh-spin var(--mesh-spin-duration) linear infinite;
}

@media (max-aspect-ratio: 1/1) {
  .block__wash {
    width: auto;
    height: 150%;
  }
}

/* a fine grain over the wash so the flat colour reads as paper */
.block__grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
  opacity: 0.07;
  mix-blend-mode: multiply;
}

@media (prefers-reduced-motion: reduce) {
  .block__wash {
    animation: none;
  }
}

.page__content {
  position: relative;
  /* once the details open, the whole block settles a little below dead centre: air above
     the signature. before that the name is centred exactly */
  translate: 0 0;
  animation: content-settle 1.1s cubic-bezier(0.4, 0, 0.2, 1) var(--details-at) forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: min(100%, 64rem);
}

.details {
  display: grid;
  grid-template-rows: 0fr;
  width: 100%;
  margin-top: 0;
  animation: details-open 1.1s cubic-bezier(0.4, 0, 0.2, 1) var(--details-at) forwards;
}

@keyframes content-settle {
  to {
    translate: 0 3vh;
  }
}

@keyframes details-open {
  to {
    grid-template-rows: 1fr;
    margin-top: var(--spacing-72);
  }
}

.details__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 0;
  overflow: hidden;
  /* the lines are short sentences: keep them from running wide on a desktop */
  max-width: 38rem;
  margin: 0 auto;
}

/* the lines fade in one after the other once the block has opened: title, text, links */
.details__inner > * {
  opacity: 0;
  animation: details-fade 0.8s ease-out calc(var(--details-at) + var(--fade-at)) forwards;
}

.details__inner > :nth-child(1) {
  --fade-at: 0.5s;
}

.details__inner > :nth-child(2) {
  --fade-at: 0.8s;
}

.details__inner > :nth-child(3) {
  --fade-at: 1.1s;
}

@keyframes details-fade {
  to {
    opacity: 1;
  }
}

/* the title: bold caps, tracked wide, like a letterhead */
.details__title {
  margin: 0;
  font-size: clamp(0.9rem, 1.6vw, 1.2rem);
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  /* the tracking adds space after the last letter; pull it back so the line centres */
  margin-right: -0.28em;
  color: var(--color-ink-soft);
}

.details__about {
  margin: var(--spacing-36) 0 0;
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  line-height: 1.7;
  letter-spacing: 0.04rem;
  color: var(--color-ink-soft);
}

.details__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-8) var(--spacing-24);
  margin: var(--spacing-36) 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
  letter-spacing: 0.07rem;
}

.details__link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-8);
  color: var(--color-ink-soft);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 0.2s ease;
}

.details__link:hover,
.details__link:focus-visible {
  text-decoration-color: currentColor;
  outline: none;
}

.details__icon {
  width: 1.1rem;
  height: 1.1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.foot {
  position: absolute;
  left: 0;
  right: 0;
  bottom: max(var(--spacing-36), env(safe-area-inset-bottom));
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-12);
  padding: 0 var(--spacing-24);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
  opacity: 0;
  animation: details-fade 0.8s ease-out calc(var(--details-at) + 1.4s) forwards;
}

.foot__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-ink-muted);
  opacity: 0.6;
}

@media (prefers-reduced-motion: reduce) {
  .page__content {
    animation: none;
    translate: 0 3vh;
  }

  .details {
    animation: none;
    grid-template-rows: 1fr;
    margin-top: var(--spacing-72);
  }

  .details__inner > *,
  .foot {
    animation: none;
    opacity: 1;
  }
}
</style>
