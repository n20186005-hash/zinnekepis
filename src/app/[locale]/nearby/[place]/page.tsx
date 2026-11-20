import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { nearbyPath, places, placesBySlug } from '@/data/nearby';
import { labels } from '@/data/nearby-labels';
import { routing, type Locale } from '@/i18n/routing';
import { hreflangAlternates, localizedPath } from '@/lib/site';

type Props = { params: Promise<{ locale: string; place: string }> };
const checked = '2026-11-20';

function resolve(locale: string, slug: string) {
  const place = placesBySlug.get(slug);
  if (!place || !routing.locales.includes(locale as Locale)) notFound();
  return { place, locale: locale as Locale };
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => places.map(({slug}) => ({locale, place: slug})));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const input = await params;
  const { place, locale } = resolve(input.locale, input.place);
  const [name, description] = place.copy[locale];
  const t = labels[locale];
  const path = nearbyPath(place);
  const url = localizedPath(locale, path);
  return {
    title: `${name} | Zinneke Pis`,
    description,
    keywords: [name, place.pin, t.areas[place.area], 'Zinneke Pis'],
    alternates: { canonical: url, languages: hreflangAlternates(routing.locales, path) },
    openGraph: { title: name, description, url, type: 'article', images: place.photo ? [place.photo.url] : [] },
    twitter: { card: place.photo ? 'summary_large_image' : 'summary', title: name, description, images: place.photo ? [place.photo.url] : [] },
  };
}

export default async function NearbyPage({ params }: Props) {
  const input = await params;
  const { place, locale } = resolve(input.locale, input.place);
  setRequestLocale(locale);
  const [name, introduction, history, highlights, visit, photos] = place.copy[locale];
  const licenseVersion = place.photo?.version ?? '4.0';
  const t = labels[locale];
  const inArea = places.filter((candidate) => candidate.area === place.area);
  const index = inArea.indexOf(place);
  const related = [...inArea.slice(index + 1), ...inArea.slice(0, index)].slice(0, 3);
  const pin = encodeURIComponent(`${place.pin}, ${place.street}, 1000 Brussels, Belgium`);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${pin}`;
  const directions = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Het Zinneke, Rue des Chartreux 35, 1000 Brussels, Belgium')}&destination=${pin}&travelmode=walking`;
  const regionMap = 'https://www.google.com/maps/search/?api=1&query=Brussels-Capital+Region%2C+Belgium';
  const external = 'font-medium underline underline-offset-4';

  return (
    <>
      <Header />
      <main>
        <section className="px-4 pb-12 pt-24 text-white" style={{background: 'var(--color-nature-800)'}}>
          <div className="mx-auto max-w-5xl">
            <nav className="mb-6 text-sm"><Link className="underline" href={`/${locale}#nearby`}>{t.back}</Link> · {t.areas[place.area]}</nav>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{name}</h1>
                <p className="mt-4 max-w-xl text-lg leading-relaxed">{introduction}</p>
                <a className="mt-5 inline-block rounded-md bg-white px-4 py-2 text-sm font-semibold text-nature-900" href={mapUrl}>{t.map}</a>
              </div>
              {place.photo ? (
                <figure>
                  {/* Wikimedia serves the credited, resized photograph. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="max-h-72 w-full rounded-lg bg-nature-900 object-contain" src={place.photo.url} alt={name} referrerPolicy="no-referrer" />
                  <figcaption className="mt-2 text-xs leading-relaxed">
                    <a className={external} href={place.photo.source}>{place.photo.credit} · Wikimedia Commons</a> ·{' '}
                    <a className={external} href={`https://creativecommons.org/licenses/by-sa/${licenseVersion}/`}>CC BY-SA {licenseVersion}</a> · {t.thumbnail}
                  </figcaption>
                </figure>
              ) : (
                <div className="grid min-h-32 place-items-center rounded-lg border border-dashed border-white/40 p-6 text-sm">
                  {t.placeholder}
                </div>
              )}
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
          <aside className="rounded-xl border p-5" style={{background: 'var(--bg-secondary)', borderColor: 'var(--border-color)'}}>
            <h2 className="text-xl font-semibold">{t.manager}</h2>
            <p className="mt-2">{place.manager || t.unknown}</p>
            <p className="mt-2"><a href={place.source} className={external}>{t.source}</a></p>
          </aside>
          <GuideSection title={t.highlights}>{highlights}</GuideSection>
          <GuideSection title={t.history}>{history}</GuideSection>
          <GuideSection title={t.visit}>{visit}</GuideSection>
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">{t.route}</h2>
            <p>{t.address} · {place.street}, 1000 Brussels</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li><a className={external} href={directions}>{t.walk}</a></li>
              <li><a className={external} href="https://www.stib-mivb.be/">{t.transit}</a></li>
            </ul>
          </section>
          <GuideSection title={t.photo}>{photos}</GuideSection>
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">{t.faq}</h2>
            <div><h3 className="mb-1 font-semibold">{t.access}</h3><p>{t.accessAnswers[place.access]}</p></div>
            <div>
              <h3 className="mb-1 font-semibold">{t.combine}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {related.map((item) => <Link key={item.slug} className={external} href={`/${locale}${nearbyPath(item)}`}>{item.copy[locale][0]}</Link>)}
                <Link className={external} href={`/${locale}`}>{t.home}</Link>
              </div>
            </div>
          </section>
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">{t.map}</h2>
            <iframe className="block h-72 w-full rounded-xl" loading="lazy" title={`${t.map} · ${name}`}
              referrerPolicy="strict-origin-when-cross-origin" src={`https://maps.google.com/maps?q=${pin}&z=16&output=embed`} />
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a className={external} href={mapUrl}>{t.map}</a>
              <a className={external} href={regionMap}>{t.region}</a>
            </div>
          </section>
          <p className="text-sm">{t.checked} · <time dateTime={checked}>{checked}</time></p>
        </article>
      </main>
      <Footer />
    </>
  );
}

function GuideSection({ title, children }: { title: string; children: string }) {
  return (
    <section>
      <h2 className="mb-3 text-2xl font-semibold">{title}</h2>
      <p className="leading-relaxed" style={{color: 'var(--text-secondary)'}}>{children}</p>
    </section>
  );
}
