import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { hreflangAlternates, localizedPath } from '@/lib/site';

// Only these routes belong in the sitemap. Legal/utility pages are excluded.
const ROUTES = [
  { path: '/', priority: 1 },
  { path: '/brussels-pis-statues', priority: 0.8 },
  { path: '/zinneke-pis-to-manneken-pis', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: localizedPath(locale, path),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority,
      alternates: {
        languages: hreflangAlternates(routing.locales, path),
      },
    }))
  );
}
