import { useTranslations } from 'next-intl';
import { ATTRACTION } from '@/lib/site';

export default function LocationSection() {
  const t = useTranslations('location');

  const facts = [
    { label: t('addressLabel'), value: t('addressValue') },
    { label: t('plusCodeLabel'), value: ATTRACTION.plusCode },
    {
      label: t('coordinatesLabel'),
      value: `${ATTRACTION.latitude.toFixed(5)}, ${ATTRACTION.longitude.toFixed(5)}`,
    },
    { label: t('walkFromGrandPlaceLabel'), value: t('walkFromGrandPlaceValue') },
  ];

  return (
    <section id="location" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p
          className="text-lg leading-relaxed mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('answer')}
        </p>

        <div
          className="rounded-2xl p-6 sm:p-8 mb-8"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>
                  {fact.label}
                </dt>
                <dd className="font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={ATTRACTION.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('openMaps')}
          </a>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>{t('freeLabel')}:</strong>{' '}
            {t('freeValue')}
          </p>
        </div>
      </div>
    </section>
  );
}
