import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.varsitysteps.co.zw'; // Change this to your actual domain

  // Manually add static URLs
  const staticUrls = [
    { loc: `${baseUrl}/`, lastmod: new Date().toISOString(), priority: 1.0 },
    { loc: `${baseUrl}/tutoring`, lastmod: new Date().toISOString(), priority: 0.8 },
    { loc: `${baseUrl}/institutions`, lastmod: new Date().toISOString(), priority: 0.5 },
    { loc: `${baseUrl}/about`, lastmod: new Date().toISOString(), priority: 0.5 },
  ];
   
  const urls = [...staticUrls, ...dynamicUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
    <url>
      <loc>${url.loc}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <priority>${url.priority}</priority>
    </url>
    `
      )
      .join('')}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
