/**
 * Registry of the long-tail guide pages (content topics).
 *
 * Every entry maps a URL slug to:
 *  - `key`   the message namespace used for the homepage link card
 *            (`topics.<key>.linkTitle` / `.linkIntro` / `.slug`)
 *  - `group` used for internal-link ordering on the homepage
 *
 * The article body lives in `topic.<key>`, except for the two original guides
 * which keep their own namespaces (`topicStatues` / `topicRoute`).
 */

export type TopicGroup = 'getting-there' | 'story' | 'statues' | 'district';

export type TopicDef = {
  slug: string;
  /** Link-card namespace key (`topics.<key>`). */
  key: string;
  group: TopicGroup;
};

export const TOPICS: readonly TopicDef[] = [
  // Getting there
  { slug: 'location-and-map', key: 'locationAndMap', group: 'getting-there' },
  { slug: 'public-transport', key: 'publicTransport', group: 'getting-there' },
  { slug: 'grand-place-to-zinneke-pis', key: 'grandPlaceRoute', group: 'getting-there' },
  { slug: 'central-station-to-zinneke-pis', key: 'centralStationRoute', group: 'getting-there' },
  { slug: 'midi-station-to-zinneke-pis', key: 'midiStationRoute', group: 'getting-there' },
  { slug: 'zinneke-pis-to-jeanneke-pis', key: 'jeannekeRoute', group: 'getting-there' },
  { slug: 'zinneke-pis-to-manneken-pis', key: 'route', group: 'getting-there' },
  // Story
  { slug: 'history', key: 'history', group: 'story' },
  { slug: 'what-does-zinneke-mean', key: 'zinnekeMeaning', group: 'story' },
  { slug: 'photos', key: 'photos', group: 'story' },
  // Other statues
  { slug: 'manneken-pis', key: 'mannekenPis', group: 'statues' },
  { slug: 'jeanneke-pis', key: 'jeannekePis', group: 'statues' },
  { slug: 'brussels-pis-statues', key: 'statues', group: 'statues' },
  // District
  { slug: 'rue-des-chartreux', key: 'rueDesChartreux', group: 'district' },
] as const;

const BY_SLUG = new Map(TOPICS.map((topic) => [topic.slug, topic]));

export function getTopic(slug: string): TopicDef | undefined {
  return BY_SLUG.get(slug);
}

/** Message namespace holding the full article body for a topic key. */
export function topicNamespace(key: string): string {
  if (key === 'statues') return 'topicStatues';
  if (key === 'route') return 'topicRoute';
  return `topic.${key}`;
}
