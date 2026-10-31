<script setup lang="ts">
// the header: the monogram with the chapter links set symmetrically round it on a desktop. below
// 60rem the links move behind a menu button, but only once js runs (`isHydrated`): without it
// they simply stand as a row
const LINKS = [
  { href: '#connection', label: 'Connection' },
  { href: '#mindset', label: 'Mindset' },
  { href: '#experience', label: 'Experience' },
  { href: '#connect', label: 'Connect' },
]

const isHydrated = ref(false)
const isOpen = ref(false)
const toggle = useTemplateRef<HTMLButtonElement>('toggle')
const nav = useTemplateRef<HTMLElement>('nav')

function setOpen(open: boolean, returnFocus = false) {
  isOpen.value = open
  document.documentElement.classList.toggle('menu-open', open)
  // while the menu covers the page, the page behind it can't be reached
  for (const outside of document.querySelectorAll<HTMLElement>('#main, .site-footer')) {
    outside.inert = open
  }

  if (open) {
    nextTick(() => nav.value?.querySelector('a')?.focus())
  } else if (returnFocus) {
    toggle.value?.focus()
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    setOpen(false, true)
  }
}

// growing past the breakpoint with the menu open would leave the page inert
function onBreakpoint(event: MediaQueryListEvent) {
  if (event.matches && isOpen.value) {
    setOpen(false)
  }
}

let desktop: MediaQueryList | undefined

onMounted(() => {
  isHydrated.value = true
  desktop = window.matchMedia('(min-width: 60rem)')
  desktop.addEventListener('change', onBreakpoint)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  desktop?.removeEventListener('change', onBreakpoint)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="site-header" :class="{ 'site-header--js': isHydrated }">
    <div class="site-header__inner">
      <a class="brand" href="#top">
        <Monogram class="brand__mark" />
        <span class="visually-hidden">Marit van Wees, naar het begin van de pagina</span>
      </a>
      <button
        ref="toggle"
        class="menu-toggle"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="site-nav"
        @click="setOpen(!isOpen)"
      >
        <span>{{ isOpen ? 'Sluit' : 'Menu' }}</span>
        <span class="menu-toggle__icon" aria-hidden="true" />
      </button>
      <nav
        id="site-nav"
        ref="nav"
        class="site-nav"
        :class="{ 'site-nav--open': isOpen }"
        aria-label="Hoofdmenu"
      >
        <ul class="site-nav__list" lang="en">
          <li v-for="link in LINKS" :key="link.href">
            <a :href="link.href" @click="isOpen && setOpen(false)">{{ link.label }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: relative;
  z-index: 20;
}

.site-header__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: var(--wide);
  margin: 0 auto;
  padding: 1.1rem var(--gutter);
}

.site-header:not(.site-header--js) .site-header__inner {
  justify-content: center;
}

.brand {
  position: relative;
  z-index: 2;
  display: inline-flex;
  color: var(--brass-400);
  border-radius: 50%;
  transition: color 0.3s ease;
}

.brand:hover {
  color: var(--brass-300);
}

.brand__mark {
  width: 58px;
  height: 58px;
}

.menu-toggle {
  position: relative;
  z-index: 2;
  display: none;
  align-items: center;
  gap: 0.85rem;
  min-height: 44px;
  padding: 0.6rem 1rem 0.6rem 1.15rem;
  border: 1px solid var(--line);
  border-radius: 0;
  background: transparent;
  color: var(--cream-100);
  font: inherit;
  font-family: var(--font-caps);
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
}

.menu-toggle:hover {
  border-color: var(--brass-400);
}

.menu-toggle__icon {
  position: relative;
  width: 20px;
  height: 7px;
}

.menu-toggle__icon::before,
.menu-toggle__icon::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--brass-400);
  transition:
    transform 0.35s var(--ease),
    top 0.35s var(--ease);
}

.menu-toggle__icon::before {
  top: 0;
}

.menu-toggle__icon::after {
  top: 6px;
}

.menu-toggle[aria-expanded='true'] .menu-toggle__icon::before {
  top: 3px;
  transform: rotate(45deg);
}

.menu-toggle[aria-expanded='true'] .menu-toggle__icon::after {
  top: 3px;
  transform: rotate(-45deg);
}

.site-nav {
  width: 100%;
}

.site-nav__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-nav a {
  position: relative;
  display: inline-block;
  padding: 0.55rem 0.1rem;
  color: var(--cream-100);
  font-family: var(--font-caps);
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  text-decoration: none;
  text-transform: uppercase;
}

.site-nav a::after {
  content: '';
  position: absolute;
  left: 0.1rem;
  right: calc(0.1rem + 0.22em);
  bottom: 0.3rem;
  height: 1px;
  background: var(--brass-400);
  transform: scaleX(0);
  transition: transform 0.45s var(--ease);
}

.site-nav a:hover::after,
.site-nav a:focus-visible::after {
  transform: scaleX(1);
}

/* phone and tablet: the links become a full-screen menu once js runs */
@media (max-width: 59.99rem) {
  .site-header--js .menu-toggle {
    display: inline-flex;
  }

  .site-header--js .site-nav {
    position: fixed;
    inset: 0;
    z-index: 1;
    display: grid;
    place-items: center;
    padding: 6rem var(--gutter) 3rem;
    background:
      var(--tex-grain-soft) 0 0 / 240px 240px,
      var(--forest-900);
    background-blend-mode: soft-light;
    visibility: hidden;
    opacity: 0;
    transition:
      opacity 0.35s ease,
      visibility 0s linear 0.35s;
  }

  .site-header--js .site-nav--open {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.35s ease;
  }

  .site-header--js .site-nav__list {
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }

  .site-header--js .site-nav__list li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }

  .site-header--js .site-nav__list li + li::before {
    content: '';
    width: 6px;
    height: 6px;
    border: 1px solid var(--brass-400);
    transform: rotate(45deg);
  }

  .site-header--js .site-nav a {
    font-size: 1.05rem;
    letter-spacing: 0.24em;
  }
}

/* desktop: two links either side of the monogram */
@media (min-width: 60rem) {
  .site-header__inner {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    padding-top: 1.75rem;
    padding-bottom: 0.5rem;
  }

  .brand,
  .site-nav {
    grid-row: 1;
    grid-column: 1;
  }

  .brand__mark {
    width: 84px;
    height: 84px;
  }

  .site-nav__list {
    display: grid;
    grid-template-columns: 1fr 1fr 8.5rem 1fr 1fr;
    align-items: center;
    max-width: 54rem;
    margin: 0 auto;
    gap: 0;
  }

  .site-nav__list li {
    justify-self: center;
  }

  .site-nav__list li:nth-child(3) {
    grid-column: 4;
  }
}
</style>
