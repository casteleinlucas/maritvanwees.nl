// counts visits with plausible, on our own server: no cookies and nothing that recognizes a
// visitor, so no consent banner. only on the site itself, with or without www (plausible counts
// both as the one site): a developer's machine and a preview deploy count nothing. the script and
// the visits go through this site (server/routes/v/), so a blocker that knows plausible's host
// lets them through. the script follows the page by itself, so there is no pageview to send by
// hand
const domain = 'maritvanwees.nl'

export default defineNuxtPlugin(() => {
  const { hostname } = window.location
  if (hostname !== domain && hostname !== `www.${domain}`) return

  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = domain
  script.dataset.api = '/v/event'
  script.src = '/v/script.js'
  document.head.appendChild(script)
})
