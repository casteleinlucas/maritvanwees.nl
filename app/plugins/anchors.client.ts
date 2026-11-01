// scrolls to a chapter without writing its #anchor into the address bar: the page is one scroll,
// so the url stays the plain domain. the scroll still follows main.css (smooth, or instant with
// reduced motion), and focus moves to the chapter, as the browser's own jump would do
export default defineNuxtPlugin(() => {
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
    const href = link?.getAttribute('href')
    if (!href) {
      return
    }

    // #top has no element: it is the start of the page
    if (href === '#top') {
      event.preventDefault()
      window.scrollTo({ top: 0 })
      link?.blur()
      return
    }

    const target = document.getElementById(href.slice(1))
    if (!target) {
      return
    }

    event.preventDefault()
    target.scrollIntoView()
    target.focus({ preventScroll: true })
  })
})
