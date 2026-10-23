import { useTranslations, useLocale, useMessages } from 'next-intl';
import Link from 'next/link';

type Fact = { label: string; value: string };
type QA = { question: string; answer: string };
type Section = { title: string; body: string };

/**
 * Shared renderer for the long-form guides.
 *
 * Every topic namespace (`topicStatues`, `topicRoute`, `topic.<key>`) exposes
 * the same optional key set: `sections`, `facts`, `steps`, `faq`, `related`
 * and `directionsUrl`.
 */
export default function TopicArticle({ ns }: { ns: string }) {
  const t = useTranslations(ns as any);
  const ht = useTranslations('header');
  const tt = useTranslations('topics');
  const locale = useLocale();
  const messages = useMessages() as any;

  const sections = (messages?.[ns]?.sections || []) as Section[];
  const facts = (messages?.[ns]?.facts || []) as Fact[];
  const steps = (messages?.[ns]?.steps || []) as string[];
  const faq = (messages?.[ns]?.faq || []) as QA[];
  const related = (messages?.[ns]?.related || []) as string[];
  const directionsUrl = messages?.[ns]?.directionsUrl as string | undefined;

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

      {sections.length > 0 && (
        <div className="mb-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2
                className="font-display text-2xl font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {section.title}
              </h2>
              {section.body.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed mb-4 last:mb-0"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      )}

      {facts.length > 0 && (
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
      )}

      {steps.length > 0 && (
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
      )}

      {directionsUrl && (
        <div className="mb-12 flex justify-center">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {tt('directionsLink')}
          </a>
        </div>
      )}

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

      {related.length > 0 && (
        <section>
          <h2
            className="font-display text-2xl font-semibold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            {tt('relatedTitle')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((key) => (
              <Link
                key={key}
                href={`/${locale}/${tt(`${key}.slug`)}`}
                className="group rounded-xl p-5 transition-shadow hover:shadow-md"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <h3
                  className="font-semibold mb-1 group-hover:underline underline-offset-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {tt(`${key}.linkTitle`)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {tt(`${key}.linkIntro`)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
