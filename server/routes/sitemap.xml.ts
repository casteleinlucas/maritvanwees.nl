import { joinURL, withoutTrailingSlash } from 'ufo'

/**
 * Hand-written: the site is one page, which is less code than configuring a sitemap module
 * would be. Add an entry here when a page is added.
 */
export default defineEventHandler((event) => {
  const siteUrl = withoutTrailingSlash(useRuntimeConfig(event).public.siteUrl)

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  // a day of cache: the page changes rarely, and crawlers refetch this often
  setHeader(event, 'cache-control', 'public, max-age=86400')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${joinURL(siteUrl, '/')}</loc>
    <changefreq>yearly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
})
