import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

const BASE_URL = 'https://zinnekepis.com';
const HERO_IMAGE = `${BASE_URL}/gallery/zinnekepis%20(1).jpg`;
const MAPS_SHARE_URL = 'https://maps.app.goo.gl/JYWuyur9ydE1bJCF7';
const GOVT_TOURISM_URL = 'https://visitbrussels.be/';

const TOURIST_ATTRACTION_DATA = {
  name: 'Zinneke Pis',
  alternateNames: ['Het Zinneke', 'Brussels Zinneke Pis'],
  streetAddress: 'Rue des Chartreux 35',
  addressLocality: 'Brussels',
  addressRegion: 'Brussels-Capital Region',
  postalCode: '1000',
  addressCountry: 'BE',
  latitude: 50.8487904,
  longitude: 4.3266355,
  countryName: 'Belgium',
};

const LOCALE_META = {
  nl: {
    pageTitle: 'Zinneke Pis (Brussel) - Bezoekersgids & Locatie',
    pageDescription:
      'Ontdek Zinneke Pis, het iconische monument in Brussel, Brussels Hoofdstedelijk Gewest, België. Bekijk de kaart, praktische bezoekersinformatie, nabijgelegen Manneken Pis en de Grote Markt, plus reistips.',
    ogTitle: 'Zinneke Pis - Reisgids voor Brussel',
    ogDescription: 'Officiële bezoekersgids voor Zinneke Pis in Brussel, Brussels Hoofdstedelijk Gewest, België.',
    ogImageAlt: 'Zinneke Pis in Brussel, België',
    schemaDescription: 'Uitgebreide bezoekersgids voor Zinneke Pis in Brussel, Brussels Hoofdstedelijk Gewest, België.',
    faqLocationQuestion: 'Waar ligt Zinneke Pis?',
    faqLocationAnswer:
      'Zinneke Pis ligt aan Rue des Chartreux 35, 1000 Brussel, in Brussel, Brussels Hoofdstedelijk Gewest, België.',
    faqFreeQuestion: 'Is Zinneke Pis gratis te bezoeken?',
    faqFreeAnswer: 'Ja, Zinneke Pis is een openbare plek en gratis te bezoeken, het hele jaar door en 24 uur per dag.',
    faqNearbyQuestion: 'Welke bekende bezienswaardigheden liggen in de buurt van Zinneke Pis?',
    faqNearbyAnswer:
      'Bij een bezoek aan Zinneke Pis kun je gemakkelijk ook Manneken Pis en de Grote Markt verkennen, beide op loopafstand.',
    htmlLang: 'nl-BE',
    ogLocale: 'nl_BE',
  },
  zh: {
    pageTitle: 'Zinneke Pis (Brussels) - 游客指南与位置',
    pageDescription:
      '探索比利时布鲁塞尔首都大区的地标 Zinneke Pis。查看位置地图、参观详情、周边小尿童 (Manneken Pis) 和大广场 (Grand Place) 等景点，以及旅行贴士。',
    ogTitle: 'Zinneke Pis - 布鲁塞尔旅游指南',
    ogDescription: '比利时布鲁塞尔首都大区 Zinneke Pis 官方游客指南。',
    ogImageAlt: '布鲁塞尔 Zinneke Pis 主视图',
    schemaDescription: '比利时布鲁塞尔首都大区布鲁塞尔 Zinneke Pis 综合游客指南。',
    faqLocationQuestion: 'Zinneke Pis 位于哪里？',
    faqLocationAnswer: 'Zinneke Pis 位于比利时布鲁塞尔首都大区布鲁塞尔 Rue des Chartreux 35, 1000 Bruxelles。',
    faqFreeQuestion: '参观 Zinneke Pis 是免费的吗？',
    faqFreeAnswer: '是的，Zinneke Pis 是一个公共场所，全年免费向公众开放参观，24小时均可访问。',
    faqNearbyQuestion: 'Zinneke Pis 附近有哪些著名景点？',
    faqNearbyAnswer:
      '参观 Zinneke Pis 时，游客可以轻松游览周边的历史地标，包括小尿童 (Manneken Pis) （步行约5分钟）和大广场 (Grand Place) （步行约10分钟）。',
    htmlLang: 'zh-CN',
    ogLocale: 'zh_CN',
  },
  en: {
    pageTitle: 'Zinneke Pis (Brussels) - Visitor Guide & Location',
    pageDescription:
      'Discover Zinneke Pis, the iconic landmark in Brussels, Brussels-Capital Region, Belgium. View location map, opening details, nearby Manneken Pis, Grand Place, and travel tips.',
    ogTitle: 'Zinneke Pis - Brussels Travel Guide',
    ogDescription:
      'Official visitor guide to Zinneke Pis in Brussels, Brussels-Capital Region, Belgium.',
    ogImageAlt: 'Zinneke Pis in Brussels',
    schemaDescription:
      'Comprehensive visitor guide to Zinneke Pis in Brussels, Brussels-Capital Region, Belgium.',
    faqLocationQuestion: 'Where is Zinneke Pis located?',
    faqLocationAnswer:
      'Zinneke Pis is located at Rue des Chartreux 35, 1000 Bruxelles, in Brussels, Brussels-Capital Region, Belgium.',
    faqFreeQuestion: 'Is Zinneke Pis free to visit?',
    faqFreeAnswer: 'Yes, Zinneke Pis is a public space and is free to visit year-round, accessible 24/7.',
    faqNearbyQuestion: 'What are the famous landmarks near Zinneke Pis?',
    faqNearbyAnswer:
      'When visiting Zinneke Pis, visitors can easily explore surrounding historical landmarks, including Manneken Pis and Grand Place.',
    htmlLang: 'en',
    ogLocale: 'en_US',
  },
} as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = LOCALE_META[locale as keyof typeof LOCALE_META] ?? LOCALE_META.en;
  const selfUrl = `${BASE_URL}/${locale}`;

  return {
    title: meta.pageTitle,
    description: meta.pageDescription,
    alternates: {
      canonical: selfUrl,
      languages: Object.fromEntries([
        ...routing.locales.map((loc) => [loc, `${BASE_URL}/${loc}`]),
        ['x-default', `${BASE_URL}/${routing.defaultLocale}`],
      ]),
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: selfUrl,
      siteName: 'Zinneke Pis',
      locale: meta.ogLocale,
      type: 'website',
      images: [
        {
          url: HERO_IMAGE,
          width: 1200,
          height: 800,
          alt: meta.ogImageAlt,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const meta = LOCALE_META[locale as keyof typeof LOCALE_META] ?? LOCALE_META.en;

  const touristAttractionLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${BASE_URL}/#attraction`,
    name: TOURIST_ATTRACTION_DATA.name,
    alternateName: TOURIST_ATTRACTION_DATA.alternateNames,
    description: meta.schemaDescription,
    url: `${BASE_URL}/${locale}`,
    image: [HERO_IMAGE],
    isAccessibleForFree: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: TOURIST_ATTRACTION_DATA.streetAddress,
      addressLocality: TOURIST_ATTRACTION_DATA.addressLocality,
      addressRegion: TOURIST_ATTRACTION_DATA.addressRegion,
      postalCode: TOURIST_ATTRACTION_DATA.postalCode,
      addressCountry: TOURIST_ATTRACTION_DATA.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: TOURIST_ATTRACTION_DATA.latitude,
      longitude: TOURIST_ATTRACTION_DATA.longitude,
    },
    hasMap: MAPS_SHARE_URL,
    sameAs: [MAPS_SHARE_URL, GOVT_TOURISM_URL],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: meta.faqLocationQuestion,
        acceptedAnswer: {
          '@type': 'Answer',
          text: meta.faqLocationAnswer,
        },
      },
      {
        '@type': 'Question',
        name: meta.faqFreeQuestion,
        acceptedAnswer: {
          '@type': 'Answer',
          text: meta.faqFreeAnswer,
        },
      },
      {
        '@type': 'Question',
        name: meta.faqNearbyQuestion,
        acceptedAnswer: {
          '@type': 'Answer',
          text: meta.faqNearbyAnswer,
        },
      },
    ],
  };

  return (
    <html lang={meta.htmlLang} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <link rel="canonical" href={`${BASE_URL}/${locale}`} />
        <meta property="og:image" content={HERO_IMAGE} />
        <meta property="og:image:alt" content={meta.ogImageAlt} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(touristAttractionLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqLd),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
