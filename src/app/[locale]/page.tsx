import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LocationSection from '@/components/LocationSection';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import InfoSection from '@/components/InfoSection';
import RouteSection from '@/components/RouteSection';
import RelatedTopics from '@/components/RelatedTopics';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import Recommendations from '@/components/Recommendations';
import HotelsSection from '@/components/HotelsSection';
import Gallery from '@/components/Gallery';
import FAQSection from '@/components/FAQSection';
import RatingSnapshot from '@/components/RatingSnapshot';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LocationSection />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <InfoSection />
        <RouteSection />
        <RelatedTopics />
        <PhotoSpotsSection />
        <Recommendations />
        <HotelsSection />
        <Gallery />
        <FAQSection />
        <RatingSnapshot />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
