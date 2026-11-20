import type { Locale } from '@/i18n/routing';
import { centralPlaces } from './nearby-central';
import { upperPlaces } from './nearby-upper';
import { outerPlaces } from './nearby-outer';

export type Area = 'west' | 'centre' | 'upper' | 'marolles';
export type Access = 'outdoors' | 'venue' | 'worship' | 'mixed';
export type Copy = [name: string, introduction: string, history: string, highlights: string, visit: string, photos: string];
export type Photo = { url: string; source: string; credit: string; version?: '3.0' | '4.0' };
export type Place = {
  slug: string;
  area: Area;
  access: Access;
  pin: string;
  street: string;
  source: string;
  manager?: string;
  photo?: Photo;
  copy: Record<Locale, Copy>;
};

export const areas: readonly Area[] = ['west', 'centre', 'upper', 'marolles'];
export const places: readonly Place[] = [...centralPlaces, ...upperPlaces, ...outerPlaces];
export const placesBySlug = new Map(places.map((place) => [place.slug, place]));

export function nearbyPath(place: Place) {
  return `/nearby/${place.slug}`;
}
