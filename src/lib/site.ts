/**
 * Single source of truth for zinnekepis.com.
 *
 * Every language version (nl / en / fr / zh) reads the same numbers and the
 * same entity facts from here, so values can never drift between locales.
 */

/** Canonical origin — all canonicals, hreflang and sitemap URLs use this host. */
export const SITE_URL = 'https://www.zinnekepis.com';

/** Host used for the apex -> www redirect in `src/middleware.ts`. */
export const CANONICAL_HOST = 'www.zinnekepis.com';

export const ATTRACTION = {
  /** Name used on Google Maps / Visit Brussels as the primary listing title. */
  name: 'Het Zinneke',
  /** Name most searchers actually type. */
  shortName: 'Zinneke Pis',
  alternateNames: ['Zinneke Pis', 'Zinneke-Pis', 'Het Zinneke Pis'],

  streetAddress: 'Rue des Chartreux 35',
  postalCode: '1000',
  addressLocality: 'Bruxelles',
  addressRegion: 'Brussels-Capital Region',
  addressCountry: 'BE',
  countryName: 'Belgium',

  latitude: 50.8487904,
  longitude: 4.3266355,
  plusCode: 'R8XW+G7 Brussels, Belgium',

  mapsUrl: 'https://maps.app.goo.gl/JYWuyur9ydE1bJCF7',
  officialTourismUrl: 'https://visitbrussels.be/',
  officialVenueUrl:
    'https://www.visit.brussels/en/visitors/venue-details.Zinneke-Pis.50001051',

  /** Per Visit Brussels the bronze was created by Tom Frantzen in 1999. */
  createdYear: 1999,
  artist: 'Tom Frantzen',

  isAccessibleForFree: true,
  /** Typical time visitors spend at the statue itself. */
  visitDurationMinutes: 10,

  /**
   * Snapshot of the Google Maps listing. Displayed on every language version;
   * deliberately not exposed as our own `aggregateRating` in JSON-LD.
   */
  rating: {
    value: 4.2,
    reviewCount: 7125,
    source: 'Google Maps',
    lastChecked: '2026-10-02',
  },
} as const;

export const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17935.098881751346!2d4.3266355!3d50.8487904!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c3880548ea1f%3A0x4b33b3c3e67ce1fb!2sHet%20Zinneke!5e1!3m2!1sen!2s!4v1787895931776!5m2!1sen!2s';

/** Hero / first gallery image, served from `public/gallery`. */
export const HERO_IMAGE = '/gallery/zinneke-pis-brussels.jpg';

/** SEO-friendly filenames used by the gallery component, in display order. */
export const GALLERY_IMAGES = [
  '/gallery/zinneke-pis-brussels.jpg',
  '/gallery/het-zinneke-close-up.jpg',
  '/gallery/zinneke-pis-dog-statue-brussels.jpg',
  '/gallery/het-zinneke-lamppost.jpg',
  '/gallery/zinneke-pis-side-view.jpg',
  '/gallery/het-zinneke-rue-des-chartreux.jpg',
  '/gallery/zinneke-pis-bronze-details.jpg',
  '/gallery/zinneke-pis-cobblestone-street.jpg',
  '/gallery/het-zinneke-neighbourhood.jpg',
  '/gallery/zinneke-pis-winter-brussels.jpg',
  '/gallery/zinneke-pis-at-night-brussels.jpg',
] as const;

/**
 * hreflang codes per locale. `x-default` points at English because that is the
 * version served to everyone whose language is not available on the site.
 */
export const HREFLANG_LOCALES = {
  nl: 'nl-BE',
  en: 'en',
  fr: 'fr-BE',
  zh: 'zh-Hans',
} as const;

export const X_DEFAULT_LOCALE = 'en' as const;

export function localizedPath(locale: string, path: string): string {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}/${locale}${normalized}`;
}

/** Builds the reciprocal `alternates.languages` map used by every page. */
export function hreflangAlternates(
  locales: readonly string[],
  path: string
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const locale of locales) {
    const code = HREFLANG_LOCALES[locale as keyof typeof HREFLANG_LOCALES];
    result[code ?? locale] = localizedPath(locale, path);
  }
  result['x-default'] = localizedPath(X_DEFAULT_LOCALE, path);
  return result;
}
