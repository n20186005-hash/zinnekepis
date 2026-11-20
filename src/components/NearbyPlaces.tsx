import Link from 'next/link';
import type { Locale } from '@/i18n/routing';
import { areas, nearbyPath, places } from '@/data/nearby';
import { labels } from '@/data/nearby-labels';

export default function NearbyPlaces({ locale }: { locale: Locale }) {
  const t = labels[locale];

  return (
    <section id="nearby" className="section-padding scroll-mt-16" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-3xl font-semibold sm:text-4xl">{t.title}</h2>
        {areas.map((area) => (
          <section key={area} className="mb-10 last:mb-0">
            <h3 className="mb-4 text-xl font-semibold">{t.areas[area]}</h3>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {places.filter((place) => place.area === area).map((place) => (
                <li key={place.slug} className="rounded-xl border" style={{borderColor: 'var(--border-color)', background: 'var(--bg-primary)'}}>
                  <Link className="group block h-full p-5" href={`/${locale}${nearbyPath(place)}`}>
                    <span className="block font-display font-semibold group-hover:underline">{place.copy[locale][0]}</span>
                    <span className="mt-2 block text-sm leading-relaxed" style={{color: 'var(--text-secondary)'}}>{place.copy[locale][1]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
