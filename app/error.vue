<script setup lang="ts">
import type { NuxtError } from '#app'
import { PROFILE } from '@/constants/profile'

// any address but / ends here: a quiet page in the register's style that leads back home
const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)

useHead({
  title: `${isNotFound.value ? 'Pagina niet gevonden' : 'Er ging iets mis'} · ${PROFILE.name}`,
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <main class="error">
    <Monogram class="error__mark" />
    <p class="error__code">{{ error.statusCode }}</p>
    <h1 class="error__title">
      {{ isNotFound ? 'Deze pagina bestaat niet.' : 'Er ging iets mis.' }}
    </h1>
    <div class="ornament" aria-hidden="true"><i /></div>
    <a class="error__home" href="/">Naar {{ PROFILE.name }}</a>
  </main>
</template>

<style scoped>
.error {
  display: grid;
  place-content: center;
  justify-items: center;
  min-height: 100vh;
  min-height: 100svh;
  padding: 3rem var(--gutter);
  text-align: center;
}

.error__mark {
  width: 84px;
  height: 84px;
  margin-bottom: 2rem;
  color: var(--brass-400);
}

.error__code {
  margin: 0 0 1rem;
  color: var(--brass-400);
  font-family: var(--font-caps);
  font-size: 0.9rem;
  letter-spacing: 0.24em;
}

.error__title {
  color: var(--cream-100);
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 1.35rem + 3.4vw, 3.75rem);
  line-height: 1.08;
  text-wrap: balance;
}

.error__home {
  padding: 0.4rem 0 0.25rem;
  border-bottom: 1px solid var(--line);
  color: var(--brass-400);
  font-family: var(--font-caps);
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-decoration: none;
  text-transform: uppercase;
}

.error__home:hover {
  color: var(--brass-300);
  border-color: var(--brass-300);
}
</style>
