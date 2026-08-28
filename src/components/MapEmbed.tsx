import { useTranslations } from 'next-intl';

const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17935.098881751346!2d4.3266355!3d50.8487904!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c3880548ea1f%3A0x4b33b3c3e67ce1fb!2sHet%20Zinneke!5e1!3m2!1szh-CN!2s!4v1787895931776!5m2!1szh-CN!2s';
const GOVT_TOURISM_URL = 'https://visitbrussels.be/';

export default function MapEmbed() {
  const t = useTranslations('mapSection');

  return (
    <section id="map" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* Map */}
        <div
          className="map-container relative rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--map-border)' }}
        >
          <iframe
            src={MAPS_EMBED_SRC}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Google Maps - Zinneke Pis, Brussels"
          />
        </div>

        {/* Open in Google Maps */}
        <div className="mt-6 flex justify-center">
          <a
            href="https://maps.app.goo.gl/JYWuyur9ydE1bJCF7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('openMaps')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        <div
          className="mt-10 text-sm leading-relaxed p-5 rounded-lg text-center max-w-3xl mx-auto"
          style={{ color: 'var(--text-muted)', background: 'var(--bg-tertiary)', borderTop: '1px dashed var(--border-color)' }}
        >
          <span>{t('govtTourismText')}</span>
          <a
            href={GOVT_TOURISM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 ml-1"
            style={{ color: 'var(--accent)' }}
          >
            Belgium / Brussels-Capital Region Official Tourism Portal (VisitBrussels.be)
          </a>
          <span>.</span>
        </div>
      </div>
    </section>
  );
}
