import type { H3Event } from 'h3'

/**
 * Plausible, on our own server. The browser fetches its script and sends its visits through this
 * site (routes/v/), so a blocker that knows Plausible's host lets them through.
 */
export const plausibleHost = 'https://plausible.maritvanwees.nl'

/**
 * Only what Plausible reads goes along: the browser's user agent, and the visitor's address as
 * x-plausible-ip, the one Cloudflare gave us. Plausible counts unique visitors by it and keeps
 * none; without it, every visit would carry our server's address. None of Cloudflare's own
 * headers: its edge refuses a request that brings them back (error 1000).
 */
export function plausibleHeaders(event: H3Event): Record<string, string> {
  const headers: Record<string, string> = {}
  const userAgent = getHeader(event, 'user-agent')
  const address = getHeader(event, 'cf-connecting-ip')
  const contentType = getHeader(event, 'content-type')
  if (userAgent) headers['user-agent'] = userAgent
  if (address) headers['x-plausible-ip'] = address
  if (contentType) headers['content-type'] = contentType
  return headers
}

/**
 * What the Cloudflare in front of Plausible adds to its answer, which the Cloudflare in front of
 * this site would pass on as its own, and Plausible's noindex.
 */
const upstreamHeaders = [
  'age',
  'alt-svc',
  'cf-cache-status',
  'cf-ray',
  'nel',
  'report-to',
  'server',
  'x-robots-tag',
]

export function dropUpstreamHeaders(event: H3Event) {
  for (const name of upstreamHeaders) removeResponseHeader(event, name)
}
