import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { ATTRACTION, HERO_IMAGE, SITE_URL, hreflangAlternates, localizedPath } from '@/lib/site';

const HOME_PATH = '/';

const LOCALE_META = {
  nl: {
    pageTitle: 'Zinneke Pis Brussel (Het Zinneke): Locatie, Geschiedenis & Kaart',
    pageDescription:
      'Vind Zinneke Pis (Het Zinneke) op Rue des Chartreux 35 in Brussel. Exacte locatie, geschiedenis, foto\'s en hoe je de beroemde plassende hond bezoekt. Gratis, 24/7 open.',
    ogTitle: 'Zinneke Pis (Het Zinneke) in Brussel',
    ogDescription:
      'Locatie, adres en kaart van de bronzen plassende hond in de Kartuizerswijk, op 10 minuten wandelen van de Grote Markt.',
    ogImageAlt: 'Het Zinneke, beter bekend als Zinneke Pis, in Brussel',
    schemaDescription:
      'Uitgebreide bezoekersgids voor Het Zinneke (Zinneke Pis) aan Rue des Chartreux 35 in Brussel, België.',
    faqLocationQuestion: 'Waar ligt Zinneke Pis?',
    faqLocationAnswer:
      'Zinneke Pis ligt aan Rue des Chartreux 35, 1000 Brussel, België, op ongeveer 10 minuten wandelen van de Grote Markt. Plus Code: R8XW+G7 Brussel.',
    faqFreeQuestion: 'Is Zinneke Pis gratis te bezoeken?',
    faqFreeAnswer:
      'Ja. Het Zinneke staat op straat en is gratis te bezoeken, het hele jaar door en 24 uur per dag. Er is geen ticket nodig.',
    faqNearbyQuestion: 'Welke bezienswaardigheden liggen in de buurt van Zinneke Pis?',
    faqNearbyAnswer:
      'Op wandelafstand liggen Manneken Pis (ongeveer 8 minuten), Jeanneke Pis (ongeveer 12 minuten) en de Grote Markt (ongeveer 10 minuten).',
    faqCreatedQuestion: 'Wanneer is Zinneke Pis gemaakt?',
    faqCreatedAnswer:
      'Het bronzen beeld werd in 1999 gemaakt door de Brusselse beeldhouwer Tom Frantzen.',
    htmlLang: 'nl-BE',
    ogLocale: 'nl_BE',
  },
  en: {
    pageTitle: 'Zinneke Pis Brussels (Het Zinneke): Location, History & Map',
    pageDescription:
      'Find Zinneke Pis (Het Zinneke) at Rue des Chartreux 35 in Brussels. See its exact location, history, photos and how to visit the famous peeing dog statue.',
    ogTitle: 'Zinneke Pis (Het Zinneke) in Brussels',
    ogDescription:
      'Exact location, address and map of the bronze peeing dog statue in the Chartreux district, a 10-minute walk from Grand Place.',
    ogImageAlt: 'Het Zinneke, better known as Zinneke Pis, in Brussels',
    schemaDescription:
      'Visitor guide to Het Zinneke (Zinneke Pis) at Rue des Chartreux 35, Brussels, Belgium.',
    faqLocationQuestion: 'Where is Zinneke Pis located?',
    faqLocationAnswer:
      'Zinneke Pis stands at Rue des Chartreux 35, 1000 Brussels, Belgium, about a 10-minute walk from Grand Place. Plus Code: R8XW+G7 Brussels.',
    faqFreeQuestion: 'Is Zinneke Pis free to visit?',
    faqFreeAnswer:
      'Yes. Het Zinneke is an open-air street statue and is free to visit year-round, 24 hours a day. No ticket is required.',
    faqNearbyQuestion: 'What landmarks are near Zinneke Pis?',
    faqNearbyAnswer:
      'Within walking distance are Manneken Pis (about 8 minutes), Jeanneke Pis (about 12 minutes) and Grand Place (about 10 minutes).',
    faqCreatedQuestion: 'When was Zinneke Pis created?',
    faqCreatedAnswer:
      'The bronze statue was created in 1999 by Brussels sculptor Tom Frantzen.',
    htmlLang: 'en',
    ogLocale: 'en_US',
  },
  fr: {
    pageTitle: 'Zinneke Pis à Bruxelles (Het Zinneke) : Adresse, Histoire & Carte',
    pageDescription:
      'Trouvez Zinneke Pis (Het Zinneke) au 35 rue des Chartreux à Bruxelles. Adresse exacte, histoire, photos et conseils pour visiter la célèbre statue du chien qui fait pipi.',
    ogTitle: 'Zinneke Pis (Het Zinneke) à Bruxelles',
    ogDescription:
      'Adresse, localisation et carte de la statue en bronze du chien qui fait pipi, dans le quartier des Chartreux, à 10 minutes à pied de la Grand-Place.',
    ogImageAlt: 'Het Zinneke, plus connu sous le nom de Zinneke Pis, à Bruxelles',
    schemaDescription:
      'Guide de visite du Het Zinneke (Zinneke Pis), rue des Chartreux 35, Bruxelles, Belgique.',
    faqLocationQuestion: 'Où se trouve Zinneke Pis ?',
    faqLocationAnswer:
      'Zinneke Pis se dresse au 35 rue des Chartreux, 1000 Bruxelles, en Belgique, à environ 10 minutes de marche de la Grand-Place. Plus Code : R8XW+G7 Bruxelles.',
    faqFreeQuestion: 'La visite de Zinneke Pis est-elle gratuite ?',
    faqFreeAnswer:
      'Oui. Het Zinneke est une statue installée dans la rue, libre d\'accès toute l\'année, 24 h/24. Aucun billet n\'est nécessaire.',
    faqNearbyQuestion: 'Quels monuments se trouvent près de Zinneke Pis ?',
    faqNearbyAnswer:
      'À distance de marche : Manneken Pis (environ 8 minutes), Jeanneke Pis (environ 12 minutes) et la Grand-Place (environ 10 minutes).',
    faqCreatedQuestion: 'Quand Zinneke Pis a-t-il été créé ?',
    faqCreatedAnswer:
      'La statue en bronze a été réalisée en 1999 par le sculpteur bruxellois Tom Frantzen.',
    htmlLang: 'fr-BE',
    ogLocale: 'fr_BE',
  },
  zh: {
    pageTitle: 'Zinneke Pis 布鲁塞尔（Het Zinneke）：位置、历史与地图',
    pageDescription:
      '找到位于布鲁塞尔 Rue des Chartreux 35 的 Zinneke Pis（Het Zinneke）。查看这座著名「尿尿狗」雕像的确切位置、历史、照片与参观方式。免费、24 小时开放。',
    ogTitle: 'Zinneke Pis（Het Zinneke）布鲁塞尔',
    ogDescription:
      '青铜尿尿狗雕像的确切位置、地址与地图，位于夏特勒区，距大广场步行约 10 分钟。',
    ogImageAlt: '布鲁塞尔 Zinneke Pis，又称 Het Zinneke',
    schemaDescription:
      '比利时布鲁塞尔夏特勒街 35 号 Het Zinneke（Zinneke Pis）完整游客指南。',
    faqLocationQuestion: 'Zinneke Pis 位于哪里？',
    faqLocationAnswer:
      'Zinneke Pis 位于比利时布鲁塞尔 Rue des Chartreux 35（邮编 1000），距大广场步行约 10 分钟。Plus Code：R8XW+G7 Brussel。',
    faqFreeQuestion: '参观 Zinneke Pis 需要门票吗？',
    faqFreeAnswer:
      '不需要。Het Zinneke 是安置在街道上的雕像，全年 24 小时免费参观，无需门票。',
    faqNearbyQuestion: 'Zinneke Pis 附近有哪些景点？',
    faqNearbyAnswer:
      '步行可达的有小尿童 Manneken Pis（约 8 分钟）、女性小尿童 Jeanneke Pis（约 12 分钟）和大广场 Grand Place（约 10 分钟）。',
    faqCreatedQuestion: 'Zinneke Pis 是什么时候创作的？',
    faqCreatedAnswer: '这座青铜雕像由布鲁塞尔雕塑家 Tom Frantzen 于 1999 年创作。',
    htmlLang: 'zh-Hans',
    ogLocale: 'zh_CN',
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
  const key = (locale in LOCALE_META ? locale : 'en') as keyof typeof LOCALE_META;
  const meta = LOCALE_META[key];
  const selfUrl = localizedPath(locale, HOME_PATH);

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.pageTitle,
    description: meta.pageDescription,
    robots: { index: true, follow: true },
    alternates: {
      canonical: selfUrl,
      languages: hreflangAlternates(routing.locales, HOME_PATH),
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: selfUrl,
      siteName: 'Zinneke Pis Brussels',
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
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [HERO_IMAGE],
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
  const key = (locale in LOCALE_META ? locale : 'en') as keyof typeof LOCALE_META;
  const meta = LOCALE_META[key];
  const selfUrl = localizedPath(locale, HOME_PATH);

  const touristAttractionLd = {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'Place'],
    '@id': `${SITE_URL}/#attraction`,
    name: ATTRACTION.name,
    alternateName: [...ATTRACTION.alternateNames],
    description: meta.schemaDescription,
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
    containsPlace: {
      '@type': 'Place',
      name: 'Rue des Chartreux',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rue des Chartreux',
        addressLocality: ATTRACTION.addressLocality,
        addressCountry: ATTRACTION.addressCountry,
      },
    },
    sameAs: [ATTRACTION.mapsUrl, ATTRACTION.officialVenueUrl, ATTRACTION.officialTourismUrl],
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: meta.pageTitle,
        item: selfUrl,
      },
    ],
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
        name: meta.faqCreatedQuestion,
        acceptedAnswer: {
          '@type': 'Answer',
          text: meta.faqCreatedAnswer,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(touristAttractionLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbLd),
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
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
