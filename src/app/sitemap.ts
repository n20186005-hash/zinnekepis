import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { hreflangAlternates, localizedPath } from '@/lib/site';
import { TOPICS } from '@/data/topics';

// Only content routes belong in the sitemap. Legal/utility pages are excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: localizedPath(locale, '/'),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
    alternates: { languages: hreflangAlternates(routing.locales, '/') },
  }));

  const topics: MetadataRoute.Sitemap = TOPICS.flatMap((topic, index) =>
    routing.locales.map((locale) => ({
      url: localizedPath(locale, `/${topic.slug}`),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: index < 8 ? 0.8 : 0.7,
      alternates: {
        languages: hreflangAlternates(routing.locales, `/${topic.slug}`),
      },
    }))
  );

  return [...home, ...topics];
}
