'use client';

import { useState } from 'react';
import type { Photo } from '@/data/nearby';

type Props = {
  photo: Photo;
  name: string;
  pending: string;
  thumbnail: string;
};

export default function NearbyPhoto({ photo, name, pending, thumbnail }: Props) {
  const [loadedUrl, setLoadedUrl] = useState<string>();
  const loaded = loadedUrl === photo.url;
  const version = photo.version ?? '4.0';
  const link = 'font-medium underline underline-offset-4';

  return (
    <figure>
      <div className="relative grid min-h-32 place-items-center">
        {!loaded && (
          <div className="grid min-h-32 w-full place-items-center rounded-lg border border-dashed border-white/40 p-6 text-sm">
            {pending}
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={(image) => {
            if (image?.complete && image.naturalWidth > 0) setLoadedUrl(photo.url);
          }}
          className={loaded ? 'max-h-72 w-full rounded-lg bg-nature-900 object-contain' : 'pointer-events-none absolute left-0 top-0 h-1 w-1 opacity-0'}
          aria-hidden={!loaded}
          src={photo.url}
          alt={name}
          referrerPolicy="no-referrer"
          onLoad={() => setLoadedUrl(photo.url)}
          onError={() => setLoadedUrl(undefined)}
        />
      </div>
      <figcaption className="mt-2 text-xs leading-relaxed">
        <a className={link} href={photo.source}>{photo.credit} · Wikimedia Commons</a> ·{' '}
        <a className={link} href={`https://creativecommons.org/licenses/by-sa/${version}/`}>CC BY-SA {version}</a>
        {loaded && <> · {thumbnail}</>}
      </figcaption>
    </figure>
  );
}
