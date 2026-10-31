<script setup lang="ts">
// the header: the monogram with chapters I–IV set symmetrically round it, and a contact button
// at the right. below 60rem the chapters, and V as "contact", move into a contents page behind a
// menu button. that switch is css (`scripting: enabled`), not a class set on hydration, so the
// header has its final layout from the first paint and nothing moves when the js arrives
const CHAPTERS = [
  { href: '#connection', numeral: 'I', label: 'Connection' },
  { href: '#mindset', numeral: 'II', label: 'Mindset' },
  { href: '#experience', numeral: 'III', label: 'Experience' },
  { href: '#world', numeral: 'IV', label: 'World' },
  { href: '#connect', numeral: 'V', label: 'Contact' },
]

const isOpen = ref(false)
const toggle = useTemplateRef<HTMLButtonElement>('toggle')
const nav = useTemplateRef<HTMLElement>('nav')

function setOpen(open: boolean, returnFocus = false) {
  isOpen.value = open
  document.documentElement.classList.toggle('menu-open', open)
  // while the menu covers the page, the page behind it can't be reached
  for (const outside of document.querySelectorAll<HTMLElement>('.skip-link, #main, .site-footer')) {
    outside.inert = open
  }

  if (open) {
    nextTick(() => nav.value?.querySelector('a')?.focus())
  } else if (returnFocus) {
    toggle.value?.focus()
  }
}

// from the open menu, jump once it has closed: while it is open the page can't scroll, and a
// jump the browser starts then never lands (seen with the keyboard). focus moves to the chapter
function goTo(event: MouseEvent, href: string) {
  if (!isOpen.value) {
    return
  }

  event.preventDefault()
  setOpen(false)
  setTimeout(() => {
    const target = document.querySelector<HTMLElement>(href)
    if (!target) {
      return
    }

    history.pushState(null, '', href)
    target.scrollIntoView({ behavior: 'instant' })
    target.focus({ preventScroll: true })
  })
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
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand" href="#top">
        <Monogram class="brand__mark" />
        <span class="visually-hidden">Marit van Wees, naar het begin van de pagina</span>
      </a>
      <a class="contact" href="#connect">Contact</a>
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
        aria-label="Hoofdstukken"
      >
        <ol class="site-nav__list" lang="en">
          <li v-for="chapter in CHAPTERS" :key="chapter.href" class="site-nav__item">
            <a :href="chapter.href" @click="goTo($event, chapter.href)">
              <span class="site-nav__numeral" aria-hidden="true">{{ chapter.numeral }}</span>
              {{ chapter.label }}
            </a>
          </li>
        </ol>
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
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  max-width: var(--wide);
  margin: 0 auto;
  padding: 1.1rem var(--gutter);
}

.brand {
  position: relative;
  z-index: 2;
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
  width: 58px;
  height: 58px;
}

/* the contact button: the one framed element in the header */
.contact {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.55rem 1.05rem 0.55rem 1.25rem;
  border: 1px solid var(--line);
  color: var(--cream-100);
  font-family: var(--font-caps);
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    border-color 0.3s ease,
    color 0.3s ease;
}

.contact:hover {
  border-color: var(--brass-400);
  color: var(--brass-300);
}

.menu-toggle {
  position: relative;
  z-index: 2;
  display: none;
  align-items: center;
  gap: 0.75rem;
  min-height: 44px;
  padding: 0.6rem 0.25rem 0.6rem 0.75rem;
  border: 0;
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
  color: var(--brass-300);
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
  display: inline-flex;
  align-items: baseline;
  gap: 0.6em;
  padding: 0.55rem 0.1rem;
  color: var(--cream-100);
  font-family: var(--font-caps);
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  text-decoration: none;
  text-transform: uppercase;
}

.site-nav__numeral {
  color: var(--brass-400);
  font-family: var(--font-display);
  letter-spacing: 0.08em;
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

/* without js the links stand as a centred row under the monogram */
@media (scripting: none) {
  .site-header__inner {
    justify-content: center;
  }

  .brand {
    margin-right: 0;
  }
}

/* phone and tablet: a small mark, and the chapters as a contents page behind the menu button */
@media (max-width: 59.99rem) {
  .brand__mark :deep(.monogram__stitch) {
    display: none;
  }
}

@media (max-width: 59.99rem) and (scripting: enabled) {
  .menu-toggle {
    display: inline-flex;
  }

  .site-nav {
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

  .site-nav--open {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.35s ease;
  }

  .site-nav__list {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    width: min(100%, 20rem);
  }

  .site-nav__item + .site-nav__item {
    border-top: 1px solid var(--line-soft);
  }

  .site-nav a {
    display: grid;
    grid-template-columns: 3rem 1fr;
    width: 100%;
    padding: 1.1rem 0;
    font-size: 1.05rem;
    letter-spacing: 0.24em;
  }

  .site-nav__numeral {
    font-size: 1.15rem;
  }

  .site-nav a::after {
    display: none;
  }
}

/* desktop: chapters I–IV either side of the monogram, contact at the right */
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

  .brand {
    margin-right: 0;
  }

  .brand__mark {
    width: 84px;
    height: 84px;
  }

  .contact {
    position: absolute;
    top: 50%;
    right: var(--gutter);
    translate: 0 -30%;
  }

  .site-nav__list {
    display: grid;
    grid-template-columns: 1fr 1fr 8.5rem 1fr 1fr;
    align-items: center;
    max-width: 52rem;
    margin: 0 auto;
    gap: 0;
  }

  .site-nav__item {
    justify-self: center;
  }

  .site-nav__item:nth-child(3) {
    grid-column: 4;
  }

  /* contact has its own button here */
  .site-nav__item:last-child {
    display: none;
  }
}

/* on a small laptop the row narrows, so the contact button stays clear of chapter IV */
@media (min-width: 60rem) and (max-width: 74.99rem) {
  .site-nav__list {
    max-width: 40rem;
  }

  .site-nav a {
    letter-spacing: 0.16em;
  }
}
</style>
