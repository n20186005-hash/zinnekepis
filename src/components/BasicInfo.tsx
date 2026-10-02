'use client';

import { useTranslations } from 'next-intl';
import { ATTRACTION } from '@/lib/site';

export default function BasicInfo() {
  const t = useTranslations('basicInfo');

  const ratingValue = ATTRACTION.rating.value.toFixed(1);
  const reviewCount = new Intl.NumberFormat('en-US').format(ATTRACTION.rating.reviewCount);

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard
            title={t('officialName')}
            value={`${ATTRACTION.name} — ${ATTRACTION.shortName}`}
          />
          <InfoCard title={t('alsoKnownAs')} value={ATTRACTION.alternateNames.join(' · ')} />
          <InfoCard title={t('type')} value={t('typeValue')} />
          <InfoCard title={t('country')} value={t('countryValue')} />
          <InfoCard title={t('city')} value={t('cityValue')} />
          <InfoCard title={t('createdBy')} value={`${ATTRACTION.artist}, ${ATTRACTION.createdYear}`} />
          <InfoCard
            title={t('googleRating')}
            value={`${ratingValue}/5 · ${reviewCount} ${t('reviewsSuffix')}`}
          />
          <div className="md:col-span-2">
            <InfoCard title={t('address')} value={t('addressValue')} />
          </div>
        </div>

        <p className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }}>
          {t('ratingNote')}
        </p>
      </div>
    </section>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{title}</p>
      <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
    </div>
  );
}
