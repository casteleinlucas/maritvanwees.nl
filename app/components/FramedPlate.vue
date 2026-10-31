<script setup lang="ts">
import { PHOTO_WIDTHS, PORTRAIT_WIDTHS, type Photo } from '@/constants/photos'

// a photo framed as a plate: a linen passe-partout with a pale bevel round the window and brass
// corner protectors, as on a leather case
const props = withDefaults(
  defineProps<{
    photo: Photo
    // the window's shape: the title page's (wide on a tablet, upright on a phone and as the
    // desktop frontispiece, from the photo's own 4:5 crop), or 4:5, 1:1 or 3:2 in the chapters
    shape?: 'hero' | 'portrait' | 'square' | 'landscape'
    // which part of the photo the window shows; keeps heads whole and logos outside
    crop?: string
    // how wide the photo is drawn, for the srcset. with object-fit: cover that is wider than the
    // window when the window is narrower than 3:2: ×1.875 for 4:5, ×1.5 for a square
    sizes: string
    // a warm, slightly muted grade so the arena photos sit with the gold of the forest shoot
    grade?: 'none' | 'sport'
    eager?: boolean
  }>(),
  { shape: 'portrait', crop: '50% 50%', grade: 'none', eager: false },
)

const base = computed(() => `/photos/${props.photo.file}`)

function srcset(name: string, widths: readonly number[], extension: 'avif' | 'webp') {
  return widths.map((width) => `${name}-${width}.${extension} ${width}w`).join(', ')
}

// the upright crop is drawn at the window's own width: about the screen on a phone, the
// frontispiece's column (26rem) on a desktop
const PORTRAIT_MEDIA = '(max-width: 37.49rem), (min-width: 64rem)'
const PORTRAIT_SIZES = '(max-width: 37.49rem) 86vw, 26rem'
</script>

<template>
  <figure class="plate" :class="[`plate--${shape}`, `plate--grade-${grade}`]">
    <div class="plate__mat">
      <div class="plate__window">
        <picture>
          <template v-if="shape === 'hero'">
            <source
              type="image/avif"
              :media="PORTRAIT_MEDIA"
              :srcset="srcset(`${base}-staand`, PORTRAIT_WIDTHS, 'avif')"
              :sizes="PORTRAIT_SIZES"
            />
            <source
              type="image/webp"
              :media="PORTRAIT_MEDIA"
              :srcset="srcset(`${base}-staand`, PORTRAIT_WIDTHS, 'webp')"
              :sizes="PORTRAIT_SIZES"
            />
          </template>
          <source type="image/avif" :srcset="srcset(base, PHOTO_WIDTHS, 'avif')" :sizes="sizes" />
          <source type="image/webp" :srcset="srcset(base, PHOTO_WIDTHS, 'webp')" :sizes="sizes" />
          <img
            :src="`${base}-1280.webp`"
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

/* the brass corners, on the frame itself: two burnished bars per corner */
.plate::before {
  --brass: linear-gradient(135deg, #e9d39e, #b48c45 55%, #7d5c27);
  --l: 28px;
  --w: 3px;
  content: '';
  position: absolute;
  inset: -1px;
  z-index: 2;
  background:
    var(--brass) left top / var(--l) var(--w) no-repeat,
    var(--brass) left top / var(--w) var(--l) no-repeat,
    var(--brass) right top / var(--l) var(--w) no-repeat,
    var(--brass) right top / var(--w) var(--l) no-repeat,
    var(--brass) left bottom / var(--l) var(--w) no-repeat,
    var(--brass) left bottom / var(--w) var(--l) no-repeat,
    var(--brass) right bottom / var(--l) var(--w) no-repeat,
    var(--brass) right bottom / var(--w) var(--l) no-repeat;
  pointer-events: none;
}

.plate__mat {
  position: relative;
  isolation: isolate;
  padding: clamp(12px, 1.8vw, 26px);
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
  width: min(100%, 30rem);
}

.plate--portrait .plate__window {
  aspect-ratio: 4 / 5;
}

.plate--square .plate__window {
  aspect-ratio: 1 / 1;
}

.plate--landscape .plate__window {
  aspect-ratio: 3 / 2;
}

.plate--grade-sport img {
  filter: saturate(0.72) sepia(0.14) contrast(1.04) brightness(0.96);
}

/* on a phone and as the desktop frontispiece the title page's plate stands upright; the photo
   is then its own 4:5 crop, so it fills the window as it is */
@media (max-width: 37.49rem), (min-width: 64rem) {
  .plate--hero .plate__window {
    aspect-ratio: 4 / 5;
  }

  .plate--hero img {
    object-position: 50% 50%;
  }
}

@media (max-width: 37.49rem) {
  .plate::before {
    --l: 20px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .plate--hero {
    animation: rise 1.5s var(--ease) 0.55s both;
  }

  .plate--hero img {
    animation: settle 3.2s var(--ease) 0.55s both;
  }

  /* in the chapters the frame is there at once and the photo develops in it */
  .reveal-on .plate[data-reveal] {
    opacity: 1;
    transform: none;
  }

  .reveal-on .plate[data-reveal] img {
    opacity: 0;
    transform: scale(1.04);
    transition:
      opacity 1.4s var(--ease) var(--reveal-delay, 0s),
      transform 2.4s var(--ease) var(--reveal-delay, 0s);
  }

  .reveal-on .plate[data-reveal].is-visible img {
    opacity: 1;
    transform: none;
  }
}
</style>
