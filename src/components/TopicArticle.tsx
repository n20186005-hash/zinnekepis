import { useTranslations, useLocale, useMessages } from 'next-intl';
import Link from 'next/link';

type Fact = { label: string; value: string };
type QA = { question: string; answer: string };

/**
 * Shared renderer for the two long-form guides. Both namespaces
 * (`topicStatues` / `topicRoute`) expose the same key set.
 */
export default function TopicArticle({ ns }: { ns: string }) {
  const t = useTranslations(ns as any);
  const ht = useTranslations('header');
  const locale = useLocale();
  const messages = useMessages() as any;

  const facts = (messages?.[ns]?.facts || []) as Fact[];
  const steps = (messages?.[ns]?.steps || []) as string[];
  const faq = (messages?.[ns]?.faq || []) as QA[];

  const otherTopic =
    ns === 'topicStatues'
      ? { slug: 'zinneke-pis-to-manneken-pis', key: 'route' }
      : { slug: 'brussels-pis-statues', key: 'statues' };
  const tt = useTranslations('topics');

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-70"
        style={{ color: 'var(--accent)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        {ht('backToHome')}
      </Link>

      <h1
        className="font-display text-3xl sm:text-4xl font-bold mb-6 leading-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {t('title')}
      </h1>
      <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

      <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--text-secondary)' }}>
        {t('intro')}
      </p>

      <section className="mb-12">
        <h2
          className="font-display text-2xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('factsTitle')}
        </h2>
        <dl className="space-y-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl p-5"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <dt className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {fact.label}
              </dt>
              <dd className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-12">
        <h2
          className="font-display text-2xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('stepsTitle')}
        </h2>
        <ol className="relative space-y-4">
          <div className="absolute left-5 top-0 bottom-0 w-0.5" style={{ background: 'var(--border-color)' }} />
          {steps.map((step, i) => (
            <li key={i} className="relative flex gap-4 pl-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10"
                style={{ background: 'var(--accent)', color: 'white' }}
              >
                {i + 1}
              </div>
              <p className="flex-1 pt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <h2
          className="font-display text-2xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('faqTitle')}
        </h2>
        <div className="space-y-4">
          {faq.map((item) => (
            <div
              key={item.question}
              className="rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div className="px-5 py-4 border-b border-dashed" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="font-semibold leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {item.question}
                </h3>
              </div>
              <div className="px-5 py-4">
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link
        href={`/${locale}/${otherTopic.slug}`}
        className="group inline-flex items-center gap-2 text-base font-medium hover:underline underline-offset-4"
        style={{ color: 'var(--accent)' }}
      >
        {tt(`${otherTopic.key}.linkTitle`)}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </article>
  );
}
