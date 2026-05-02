import { problems } from '../src/data/problems.js';

const BASE_URL = 'https://dsamaster.de';

const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/datastructures', priority: '0.8', changefreq: 'weekly' },
  { url: '/algorithms', priority: '0.8', changefreq: 'weekly' },
  { url: '/problems', priority: '0.9', changefreq: 'daily' },
  { url: '/progress', priority: '0.6', changefreq: 'weekly' },
  { url: '/blog', priority: '0.7', changefreq: 'weekly' },
];

// Add all problem detail pages
Object.values(problems).flat().forEach(problem => {
  pages.push({
    url: `/problem/${problem.id}`,
    priority: '0.8',
    changefreq: 'monthly'
  });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

console.log(sitemap);