<script setup lang="ts">
// the header: the monogram at the left, the chapters and the contact button at the right. on a
// phone only the monogram and the contact button, so the header always fits on one line; the
// page is one scroll, so a menu there would only add a step
const CHAPTERS = [
  { href: '#passion', label: 'Passion' },
  { href: '#experience', label: 'Experience' },
  { href: '#mindset', label: 'Mindset' },
]
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand" href="#top">
        <Monogram class="brand__mark" />
        <span class="visually-hidden">Marit van Wees, naar het begin van de pagina</span>
      </a>
      <nav class="site-nav" aria-label="Hoofdstukken">
        <ul class="site-nav__list" lang="en">
          <li v-for="chapter in CHAPTERS" :key="chapter.href">
            <a :href="chapter.href">{{ chapter.label }}</a>
          </li>
        </ul>
      </nav>
      <a class="contact" href="#connect">Contact</a>
    </div>
  </header>
</template>

<style scoped>
.site-header__inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: var(--wide);
  margin: 0 auto;
  padding: 1.25rem var(--gutter);
}

.brand {
  display: inline-flex;
  margin-right: auto;
  color: var(--brass-400);
  border-radius: 50%;
  transition: color 0.3s ease;
}

.brand:hover {
  color: var(--brass-300);
}

.brand__mark {
  width: 52px;
  height: 52px;
}

.site-nav__list {
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-nav a,
.contact {
  font-family: var(--font-caps);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
}

.site-nav a {
  display: inline-block;
  padding: 0.6rem 0;
  color: var(--cream-300);
  transition: color 0.3s ease;
}

.site-nav a:hover {
  color: var(--cream-100);
}

.contact {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.5rem 1.1rem;
  border: 1px solid var(--line);
  color: var(--cream-100);
  transition:
    border-color 0.3s ease,
    color 0.3s ease;
}

.contact:hover {
  border-color: var(--brass-400);
  color: var(--brass-300);
}

@media (max-width: 47.99rem) {
  .site-nav {
    display: none;
  }

  .brand__mark {
    width: 44px;
    height: 44px;
  }
}
</style>
