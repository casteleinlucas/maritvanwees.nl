<script setup lang="ts">
// the header: on a tablet and up the monogram stands in the middle, with chapters I–IV two either
// side of it; on a phone only the monogram and the contact button, so the header always fits on
// one line; the page is one scroll, so a menu there would only add a step
const LINKS = [
  { href: '#passion', numeral: 'I', label: 'Passion' },
  { href: '#experience', numeral: 'II', label: 'Experience' },
  { href: '#mindset', numeral: 'III', label: 'Mindset' },
  { href: '#connect', numeral: 'IV', label: 'Contact' },
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
          <li v-for="link in LINKS" :key="link.href" class="site-nav__item">
            <a :href="link.href">
              <span class="site-nav__numeral" aria-hidden="true">{{ link.numeral }}</span>
              {{ link.label }}
            </a>
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
  width: 44px;
  height: 44px;
}

.site-nav {
  display: none;
}

.site-nav__list {
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
  display: inline-flex;
  align-items: baseline;
  gap: 0.6em;
  padding: 0.6rem 0;
  color: var(--cream-300);
  transition: color 0.3s ease;
}

.site-nav a:hover {
  color: var(--cream-100);
}

.site-nav__numeral {
  color: var(--brass-400);
  font-family: var(--font-display);
  letter-spacing: 0.08em;
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

/* tablet and up: the monogram in the middle, I and II to its left, III and IV to its right.
   contact is a chapter like the others there, so the two sides weigh the same */
@media (min-width: 48rem) {
  .site-header__inner {
    display: grid;
    justify-items: center;
    padding-block: 1rem;
  }

  .brand,
  .site-nav {
    grid-row: 1;
    grid-column: 1;
  }

  /* above the row of links, which runs under it */
  .brand {
    position: relative;
    z-index: 1;
    margin-right: 0;
  }

  .brand__mark {
    width: 64px;
    height: 64px;
  }

  .site-nav {
    display: block;
    width: min(100%, 52rem);
  }

  .site-nav__list {
    display: grid;
    grid-template-columns: 1fr 1fr 8rem 1fr 1fr;
    align-items: center;
  }

  .site-nav__item {
    justify-self: center;
  }

  .site-nav__item:nth-child(3) {
    grid-column: 4;
  }

  .contact {
    display: none;
  }
}
</style>
