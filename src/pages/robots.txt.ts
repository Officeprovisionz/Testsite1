// Generated at build time.
// Why: `public/robots.txt` can't conditionally include the sitemap when `SITE_URL` is set.
// This endpoint keeps the output correct for both local/dev builds and GitHub Pages subpaths.

export async function GET() {
  const base = import.meta.env.BASE_URL || '/';
  const site = process.env.SITE_URL;

  const lines: string[] = ['User-agent: *'];

  // For project sites hosted under a subpath (e.g. GitHub Pages /<repo>/),
  // restrict to that base to avoid accidental crawling of the parent origin.
  lines.push(`Allow: ${base}`);

  // Block crawling of development/staging pages
  lines.push('Disallow: /dev/');

  // Only advertise a sitemap when the build is configured with a canonical URL.
  // `@astrojs/sitemap` is enabled only when SITE_URL is set.
  if (site) {
    try {
      const sitemapUrl = new URL('sitemap-index.xml', site).toString();
      lines.push('');
      lines.push(`Sitemap: ${sitemapUrl}`);
    } catch {
      // ignore
    }
  }

  // Add crawl-delay to be respectful to the origin
  lines.push('');
  lines.push('# Crawl-delay is advisory and respected by some crawlers');
  lines.push('Crawl-delay: 1');

  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Let hosting control caching; avoid aggressively caching robots during iteration.
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
