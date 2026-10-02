import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL, hreflangAlternates, localizedPath } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicArticle from '@/components/TopicArticle';

const NS = 'topicRoute';
const PATH = '/zinneke-pis-to-manneken-pis';

type QA = { question: string; answer: string };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  const t = await getTranslations({ locale, namespace: NS });
  const selfUrl = localizedPath(locale, PATH);

  return {
    metadataBase: new URL(SITE_URL),
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: selfUrl,
      languages: hreflangAlternates(routing.locales, PATH),
    },
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
      url: selfUrl,
      type: 'article',
    },
  };
}

export default async function ZinnekeToMannekenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  setRequestLocale(locale);
  const messages = (await getMessages()) as any;
  const ns = messages?.[NS] ?? {};
  const selfUrl = localizedPath(locale, PATH);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Zinneke Pis', item: localizedPath(locale, '/') },
      { '@type': 'ListItem', position: 2, name: ns.title ?? '', item: selfUrl },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (ns.faq || []).map((item: QA) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <TopicArticle ns={NS} />
      </main>
      <Footer />
    </>
  );
}
