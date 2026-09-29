import { joinURL, withoutTrailingSlash } from 'ufo'

/**
 * A route rather than a file in public/, so the Sitemap line points at whatever origin the
 * deploy actually runs on instead of a hardcoded one — a preview environment advertising the
 * production sitemap sends crawlers to the wrong copy of the site.
 */
export default defineEventHandler((event) => {
  const siteUrl = withoutTrailingSlash(useRuntimeConfig(event).public.siteUrl)

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return `User-Agent: *
Disallow:

Sitemap: ${joinURL(siteUrl, '/sitemap.xml')}
`
})
