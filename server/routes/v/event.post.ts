/**
 * A visit the script counts, passed on to Plausible from this site's own address
 * (utils/plausible.ts).
 */
export default defineEventHandler(async (event) =>
  sendProxy(event, `${plausibleHost}/api/event`, {
    headers: plausibleHeaders(event),
    fetchOptions: {
      method: 'POST',
      body: await readRawBody(event),
      signal: AbortSignal.timeout(10_000),
    },
    onResponse: dropUpstreamHeaders,
  }),
)
