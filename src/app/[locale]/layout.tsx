import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { HERO_IMAGE, SITE_URL, hreflangAlternates, localizedPath } from '@/lib/site';

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

  return (
    <html lang={meta.htmlLang} suppressHydrationWarning>
      <head>
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
