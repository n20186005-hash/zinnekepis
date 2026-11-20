import { getMessages, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { ATTRACTION, HERO_IMAGE, SITE_URL, localizedPath } from '@/lib/site';

type QA = { question: string; answer: string };
const descriptions = {
  nl: 'Uitgebreide bezoekersgids voor Het Zinneke (Zinneke Pis) aan Rue des Chartreux 35 in Brussel, België.',
  en: 'Visitor guide to Het Zinneke (Zinneke Pis) at Rue des Chartreux 35, Brussels, Belgium.',
  fr: 'Guide de visite du Het Zinneke (Zinneke Pis), rue des Chartreux 35, Bruxelles, Belgique.',
  zh: '比利时布鲁塞尔夏特勒街 35 号 Het Zinneke（Zinneke Pis）完整游客指南。',
};

export default async function HomeStructuredData({ locale }: { locale: Locale }) {
  const messages = await getMessages();
  const items = (messages.faq as { items?: QA[] }).items ?? [];
  const t = await getTranslations('hero');
  const selfUrl = localizedPath(locale, '/');
  const touristAttractionLd = {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'Place'],
    '@id': `${SITE_URL}/#attraction`,
    name: ATTRACTION.name,
    alternateName: [...ATTRACTION.alternateNames],
    description: descriptions[locale],
    url: selfUrl,
    image: [`${SITE_URL}${HERO_IMAGE}`],
    isAccessibleForFree: ATTRACTION.isAccessibleForFree,
    touristType: ['Free attractions', 'Public art'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: ATTRACTION.streetAddress,
      addressLocality: ATTRACTION.addressLocality,
      addressRegion: ATTRACTION.addressRegion,
      postalCode: ATTRACTION.postalCode,
      addressCountry: ATTRACTION.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ATTRACTION.latitude,
      longitude: ATTRACTION.longitude,
    },
    hasMap: ATTRACTION.mapsUrl,
    sameAs: [ATTRACTION.mapsUrl, ATTRACTION.officialVenueUrl, ATTRACTION.heritageUrl],
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('h1'),
        item: selfUrl,
      },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({question, answer}: QA) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return [touristAttractionLd, breadcrumbLd, faqLd].filter((entry) => entry !== faqLd || items.length > 0).map((entry) => (
    <script key={String(entry['@type'])} type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(entry).replace(/</g, '\\u003c') }} />
  ));
}
