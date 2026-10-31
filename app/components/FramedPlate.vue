<script setup lang="ts">
import type { Photo } from '@/constants/photos'

// a photo framed as a plate: a linen passe-partout with a pale bevel round the window and brass
// corner protectors, as on a leather case
const props = withDefaults(
  defineProps<{
    photo: Photo
    // the window's shape: wide for the title page, 4:5 or square in the chapters
    shape?: 'hero' | 'portrait' | 'square'
    // which part of the photo the window shows; keeps heads whole and logos outside
    crop?: string
    // a warm grade so the arena photos sit with the forest shoot; strong tames the bright poles
    grade?: 'none' | 'warm' | 'strong'
    eager?: boolean
  }>(),
  { shape: 'portrait', crop: '50% 50%', grade: 'none', eager: false },
)

const src = computed(() => `/photos/${props.photo.file}`)
</script>

<template>
  <figure class="plate" :class="[`plate--${shape}`, `plate--grade-${grade}`]">
    <div class="plate__mat">
      <div class="plate__window">
        <picture>
          <source type="image/webp" :srcset="`${src}.webp`" />
          <img
            :src="`${src}.jpg`"
            :width="photo.width"
            :height="photo.height"
            :alt="photo.alt"
            :loading="eager ? 'eager' : 'lazy'"
            :fetchpriority="eager ? 'high' : undefined"
            decoding="async"
            :style="{ '--crop': crop }"
          />
        </picture>
      </div>
    </div>
  </figure>
</template>

<style scoped>
.plate {
  position: relative;
  margin: 0 auto;
  padding: 6px;
  border: 1px solid var(--line);
  background: var(--forest-900);
  box-shadow:
    0 2.5rem 4rem -2rem rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(0, 0, 0, 0.35);
}

/* the brass corners: eight short bars, two per corner */
.plate::before {
  --c: var(--brass-400);
  --l: 26px;
  --w: 2px;
  content: '';
  position: absolute;
  inset: -5px;
  z-index: 2;
  background:
    linear-gradient(var(--c), var(--c)) left top / var(--l) var(--w) no-repeat,
    linear-gradient(var(--c), var(--c)) left top / var(--w) var(--l) no-repeat,
    linear-gradient(var(--c), var(--c)) right top / var(--l) var(--w) no-repeat,
    linear-gradient(var(--c), var(--c)) right top / var(--w) var(--l) no-repeat,
    linear-gradient(var(--c), var(--c)) left bottom / var(--l) var(--w) no-repeat,
    linear-gradient(var(--c), var(--c)) left bottom / var(--w) var(--l) no-repeat,
    linear-gradient(var(--c), var(--c)) right bottom / var(--l) var(--w) no-repeat,
    linear-gradient(var(--c), var(--c)) right bottom / var(--w) var(--l) no-repeat;
  pointer-events: none;
}

.plate__mat {
  position: relative;
  isolation: isolate;
  padding: clamp(14px, 3vw, 40px);
  border: 1px solid var(--line-soft);
  background: var(--forest-700);
}

/* the linen weave of the mat */
.plate__mat::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--tex-linen) 0 0 / 300px 300px;
  mix-blend-mode: soft-light;
  opacity: 0.5;
  pointer-events: none;
}

/* the bevel: a pale cut line round the window */
.plate__window {
  position: relative;
  overflow: hidden;
  outline: 1px solid rgba(220, 192, 138, 0.7);
  outline-offset: 5px;
  background: var(--forest-900);
}

.plate__window::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.35),
    inset 0 0 2.5rem rgba(0, 0, 0, 0.22);
  pointer-events: none;
}

.plate__window img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: var(--crop);
}

.plate--hero {
  max-width: 68rem;
}

.plate--hero .plate__window {
  aspect-ratio: 16 / 9;
}

.plate--portrait {
  width: min(100%, 25rem);
}

.plate--portrait .plate__window {
  aspect-ratio: 4 / 5;
}

.plate--square .plate__window {
  aspect-ratio: 1 / 1;
}

.plate--grade-warm img {
  filter: saturate(0.88) sepia(0.06) contrast(1.02);
}

.plate--grade-strong img {
  filter: saturate(0.74) sepia(0.12) contrast(1.03) brightness(0.97);
}

/* on a phone the title page's plate stands upright, on marit and co */
@media (max-width: 37.49rem) {
  .plate--hero .plate__window {
    aspect-ratio: 4 / 5;
  }

  .plate--hero img {
    object-position: 38% 50%;
  }

  .plate::before {
    --l: 18px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .plate--hero {
    animation: rise 1.5s var(--ease) 0.55s both;
  }

  .plate--hero img {
    animation: settle 3.2s var(--ease) 0.55s both;
  }
}
</style>
