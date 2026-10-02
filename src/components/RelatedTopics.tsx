import { useLocale, useTranslations } from 'next-intl';

const TOPICS = [
  { slug: 'brussels-pis-statues', key: 'statues' },
  { slug: 'zinneke-pis-to-manneken-pis', key: 'route' },
] as const;

export default function RelatedTopics() {
  const t = useTranslations('topics');
  const locale = useLocale();

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-2xl sm:text-3xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="grid md:grid-cols-2 gap-5">
          {TOPICS.map(({ slug, key }) => (
            <a
              key={slug}
              href={`/${locale}/${slug}`}
              className="group rounded-xl p-6 transition-shadow hover:shadow-md"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <h3
                className="font-display text-lg font-semibold mb-2 group-hover:underline underline-offset-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {t(`${key}.linkTitle`)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t(`${key}.linkIntro`)}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
