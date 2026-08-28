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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const zhUrl = `${BASE_URL}/`;
  const enUrl = `${BASE_URL}/en`;
  const selfUrl = locale === 'zh' ? zhUrl : enUrl;

  const ogTitle = locale === 'zh'
    ? 'Zinneke Pis (Brussels) - 游客指南与位置'
    : 'Zinneke Pis (Brussels) - Visitor Guide & Location';
  const ogDesc = locale === 'zh'
    ? '探索比利时布鲁塞尔首都大区的地标 Zinneke Pis。查看位置地图、参观详情、周边小尿童 (Manneken Pis) 和大广场 (Grand Place) 等景点，以及旅行贴士。'
    : 'Discover Zinneke Pis, the iconic landmark in Brussels, Brussels-Capital Region, Belgium. View location map, opening details, nearby Manneken Pis, Grand Place, and travel tips.';

  return {
    title: ogTitle,
    description: ogDesc,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'x-default': zhUrl,
      },
    },
    openGraph: {
      title: locale === 'zh' ? 'Zinneke Pis - 布鲁塞尔旅游指南' : 'Zinneke Pis - Brussels Travel Guide',
      description: locale === 'zh'
        ? '比利时布鲁塞尔首都大区 Zinneke Pis 官方游客指南。'
        : `Official visitor guide to ${TOURIST_ATTRACTION_DATA.name} in ${TOURIST_ATTRACTION_DATA.addressLocality}, ${TOURIST_ATTRACTION_DATA.addressRegion}, ${TOURIST_ATTRACTION_DATA.countryName}.`,
      url: selfUrl,
      siteName: 'Zinneke Pis',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [
        {
          url: HERO_IMAGE,
          width: 1200,
          height: 800,
          alt: locale === 'zh' ? '布鲁塞尔 Zinneke Pis 主视图' : `${TOURIST_ATTRACTION_DATA.name} in ${TOURIST_ATTRACTION_DATA.addressLocality}`,
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

  const touristAttractionLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${BASE_URL}/#attraction`,
    name: TOURIST_ATTRACTION_DATA.name,
    alternateName: TOURIST_ATTRACTION_DATA.alternateNames,
    description: locale === 'zh'
      ? '比利时布鲁塞尔首都大区布鲁塞尔 Zinneke Pis 综合游客指南。'
      : `Comprehensive visitor guide to ${TOURIST_ATTRACTION_DATA.name} in ${TOURIST_ATTRACTION_DATA.addressLocality}, ${TOURIST_ATTRACTION_DATA.addressRegion}, ${TOURIST_ATTRACTION_DATA.countryName}.`,
    url: BASE_URL,
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
        name: locale === 'zh' ? 'Zinneke Pis 位于哪里？' : `Where is ${TOURIST_ATTRACTION_DATA.name} located?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'zh'
            ? `${TOURIST_ATTRACTION_DATA.name} 位于比利时布鲁塞尔首都大区布鲁塞尔 Rue des Chartreux 35, 1000 Bruxelles。`
            : `${TOURIST_ATTRACTION_DATA.name} is located at Rue des Chartreux 35, 1000 Bruxelles, in Brussels, Brussels-Capital Region, Belgium.`,
        },
      },
      {
        '@type': 'Question',
        name: locale === 'zh' ? '参观 Zinneke Pis 是免费的吗？' : 'Is Zinneke Pis free to visit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'zh'
            ? '是的，Zinneke Pis 是一个公共场所，全年免费向公众开放参观，24小时均可访问。'
            : `Yes, ${TOURIST_ATTRACTION_DATA.name} is a public space and is free to visit year-round, accessible 24/7.`,
        },
      },
      {
        '@type': 'Question',
        name: locale === 'zh' ? 'Zinneke Pis 附近有哪些著名景点？' : 'What are the famous landmarks near Zinneke Pis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'zh'
            ? '参观 Zinneke Pis 时，游客可以轻松游览周边的历史地标，包括小尿童 (Manneken Pis) （步行约5分钟）和大广场 (Grand Place) （步行约10分钟）。'
            : `When visiting ${TOURIST_ATTRACTION_DATA.name}, visitors can easily explore surrounding historical landmarks, including Manneken Pis (5 minutes walk) and Grand Place (10 minutes walk).`,
        },
      },
    ],
  };

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <link rel="canonical" href={locale === 'zh' ? `${BASE_URL}/` : `${BASE_URL}/en`} />
        <meta property="og:image" content={HERO_IMAGE} />
        <meta property="og:image:alt" content={locale === 'zh' ? '布鲁塞尔 Zinneke Pis 主视图' : `${TOURIST_ATTRACTION_DATA.name} in ${TOURIST_ATTRACTION_DATA.addressLocality}`} />
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
