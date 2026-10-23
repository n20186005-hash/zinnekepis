import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nl', 'en', 'fr', 'zh'],
  defaultLocale: 'nl',
  localePrefix: {
    mode: 'always',
  },
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
    '/brussels-pis-statues': '/brussels-pis-statues',
    '/zinneke-pis-to-manneken-pis': '/zinneke-pis-to-manneken-pis',
    '/location-and-map': '/location-and-map',
    '/public-transport': '/public-transport',
    '/grand-place-to-zinneke-pis': '/grand-place-to-zinneke-pis',
    '/central-station-to-zinneke-pis': '/central-station-to-zinneke-pis',
    '/midi-station-to-zinneke-pis': '/midi-station-to-zinneke-pis',
    '/zinneke-pis-to-jeanneke-pis': '/zinneke-pis-to-jeanneke-pis',
    '/history': '/history',
    '/what-does-zinneke-mean': '/what-does-zinneke-mean',
    '/photos': '/photos',
    '/manneken-pis': '/manneken-pis',
    '/jeanneke-pis': '/jeanneke-pis',
    '/rue-des-chartreux': '/rue-des-chartreux',
  },
});

export type Locale = (typeof routing.locales)[number];
