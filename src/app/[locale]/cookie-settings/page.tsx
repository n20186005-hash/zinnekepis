import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';
import { routing } from '@/i18n/routing';
import { SITE_URL, hreflangAlternates, localizedPath } from '@/lib/site';

const PATH = '/cookie-settings';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: localizedPath(locale, PATH),
      languages: hreflangAlternates(routing.locales, PATH),
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
