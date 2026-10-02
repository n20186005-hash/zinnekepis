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
  },
});

export type Locale = (typeof routing.locales)[number];
