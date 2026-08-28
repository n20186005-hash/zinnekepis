import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nl', 'zh', 'en'],
  defaultLocale: 'nl',
  localePrefix: {
    mode: 'always',
  },
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
  },
});

export type Locale = (typeof routing.locales)[number];
