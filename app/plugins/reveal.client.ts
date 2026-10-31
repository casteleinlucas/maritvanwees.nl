// reveals the blocks marked [data-reveal], which main.css hides from the first paint: the ones on
// the first screen fade in as the page opens, just after the title page, the rest as they scroll
// into view, the ones that arrive together one after the other. each seam between chapters is
// sewn shut as it comes in. `.reveal-on` marks that this ran, which stops the css fallback that
// would otherwise show everything after three seconds
export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement

  nuxtApp.hook('app:mounted', () => {
    const blocks = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    const seams = [...document.querySelectorAll<HTMLElement>('.seamed')]

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !('IntersectionObserver' in window)) {
      blocks.forEach((block) => block.classList.add('is-visible'))
      root.classList.add('reveal-on')
      return
    }

    // the first screen: after the title page has risen in, one block after the other
    const isOnScreen = (element: Element) => element.getBoundingClientRect().top < innerHeight
    blocks.filter(isOnScreen).forEach((block, index) => {
      block.style.setProperty('--reveal-delay', `${450 + index * 140}ms`)
      block.classList.add('is-visible')
    })
    seams.filter(isOnScreen).forEach((seam) => seam.classList.add('is-sewn'))

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
