import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zinnekepis.com';

  const routes = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

  const sitemapEntries = routes.flatMap((route) => {
    return routing.locales.map((locale) => {
      // Default to root or locale root
      const isDefaultLocale = locale === routing.defaultLocale;
      const path = isDefaultLocale && route === '' ? '/' : `/${locale}${route}`;
      
      return {
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
      };
    });
  });

  return sitemapEntries;
}
