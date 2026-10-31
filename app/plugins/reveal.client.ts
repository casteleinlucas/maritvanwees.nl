// the blocks marked [data-reveal] rise in as they scroll into view. `.reveal-on` on <html>
// hides them until then (main.css), and is only set here, so the prerendered html shows
// everything on its own, and the reveals stay off for reduced motion
export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement

  nuxtApp.hook('app:mounted', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const blocks = document.querySelectorAll('[data-reveal]')
    if (reduceMotion || !('IntersectionObserver' in window) || blocks.length === 0) {
      return
    }

    root.classList.add('reveal-on')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    )

    blocks.forEach((block) => observer.observe(block))
  })
})
