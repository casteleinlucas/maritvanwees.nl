// the blocks marked [data-reveal] fade in as they scroll into view, the ones that arrive together
// one after the other, and each seam between chapters is sewn shut (main.css). `.reveal-on` on
// <html> hides them until then, and is only set here, so the prerendered html shows everything
// on its own, and the reveals stay off for reduced motion
export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement

  nuxtApp.hook('app:mounted', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      return
    }

    // what is already on screen (a tall screen, a reload halfway down, a link to a chapter) stays
    // as it is; hiding it would make it blink out and back
    const isOnScreen = (element: Element) => element.getBoundingClientRect().top < innerHeight
    const blocks = [...document.querySelectorAll('[data-reveal]')]
    const seams = [...document.querySelectorAll('.seamed')]
    for (const element of blocks) {
      if (isOnScreen(element)) {
        element.classList.add('is-visible')
      }
    }
    for (const element of seams) {
      if (isOnScreen(element)) {
        element.classList.add('is-sewn')
      }
    }

    root.classList.add('reveal-on')

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }

          const element = entry.target as HTMLElement
          if (element.matches('.seamed')) {
            element.classList.add('is-sewn')
          } else {
            element.style.setProperty('--reveal-delay', `${order * 120}ms`)
            element.classList.add('is-visible')
            order++
          }
          observer.unobserve(element)
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    )

    for (const element of [...blocks, ...seams]) {
      if (!element.matches('.is-visible, .is-sewn')) {
        observer.observe(element)
      }
    }
  })
})
