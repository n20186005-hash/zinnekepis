import { useTranslations } from 'next-intl';
import { ATTRACTION } from '@/lib/site';

export default function RatingSnapshot() {
  const t = useTranslations('ratings');

  const reviewCount = new Intl.NumberFormat('en-US').format(ATTRACTION.rating.reviewCount);
  const full = Math.floor(ATTRACTION.rating.value);
  const hasHalfStar = ATTRACTION.rating.value - full >= 0.5;

  return (
    <section id="reviews" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-display text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {ATTRACTION.rating.value.toFixed(1)}
              </span>
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                / 5
              </span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={
                      i <= full || (i === full + 1 && hasHalfStar) ? '#f0b429' : 'var(--border-color)'
                    }
                    stroke="none"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              {t('reviewCount', { count: reviewCount })}
            </p>
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
            {t('sourceNote')}
          </p>

          <a
            href={ATTRACTION.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            {t('cta')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
