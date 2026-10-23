import { setRequestLocale, getTranslations, getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL, hreflangAlternates, localizedPath } from '@/lib/site';
import { TOPICS, getTopic, topicNamespace } from '@/data/topics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicArticle from '@/components/TopicArticle';

type QA = { question: string; answer: string };

/** Slugs with their own static route directory — handled by those pages. */
const STATIC_TOPIC_SLUGS = new Set(['brussels-pis-statues', 'zinneke-pis-to-manneken-pis']);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    TOPICS.filter((topic) => !STATIC_TOPIC_SLUGS.has(topic.slug)).map((topic) => ({
      locale,
      topic: topic.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale, topic: slug } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  const topic = getTopic(slug);
  if (!topic) notFound();

  const t = await getTranslations({ locale, namespace: topicNamespace(topic.key) });
  const selfUrl = localizedPath(locale, `/${slug}`);

  return {
    metadataBase: new URL(SITE_URL),
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: selfUrl,
      languages: hreflangAlternates(routing.locales, `/${slug}`),
    },
    openGraph: {
      title: t('pageTitle'),
      description: t('pageDescription'),
      url: selfUrl,
      type: 'article',
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic: slug } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  const topic = getTopic(slug);
  if (!topic) notFound();

  setRequestLocale(locale);
  const messages = (await getMessages()) as any;
  const ns = topicNamespace(topic.key);
  const entry =
    ns.startsWith('topic.')
      ? messages?.topic?.[topic.key] ?? {}
      : messages?.[ns] ?? {};
  const selfUrl = localizedPath(locale, `/${slug}`);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Zinneke Pis', item: localizedPath(locale, '/') },
      { '@type': 'ListItem', position: 2, name: entry.title ?? '', item: selfUrl },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (entry.faq || []).map((item: QA) => ({
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
        <TopicArticle ns={ns} />
      </main>
      <Footer />
    </>
  );
}
