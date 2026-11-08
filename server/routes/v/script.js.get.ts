/**
 * Plausible's script, from this site's own address (utils/plausible.ts). Its Cache-Control comes
 * along, so browsers and Cloudflare keep it for a day.
 */
export default defineEventHandler((event) =>
  sendProxy(event, `${plausibleHost}/js/script.js`, {
    headers: plausibleHeaders(event),
    fetchOptions: { signal: AbortSignal.timeout(10_000) },
    onResponse: dropUpstreamHeaders,
  }),
)
