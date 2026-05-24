import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/favoritas'],
    },
    sitemap: 'https://www.hitsdeouroletras.com.br/sitemap.xml',
  };
}