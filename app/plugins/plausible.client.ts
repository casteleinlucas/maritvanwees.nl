// counts visits with plausible, on our own server: no cookies and nothing that recognizes a
// visitor, so no consent banner. only on the site itself, with or without www (plausible counts
// both as the one site): a developer's machine and a preview deploy count nothing. the script
// follows the page by itself, so there is no pageview to send by hand. its host is also in the csp
// in nuxt.config.ts
const host = 'https://plausible.maritvanwees.nl'
const domain = 'maritvanwees.nl'

export default defineNuxtPlugin(() => {
  const { hostname } = window.location
  if (hostname !== domain && hostname !== `www.${domain}`) return

  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = domain
  script.src = `${host}/js/script.js`
  document.head.appendChild(script)
})
