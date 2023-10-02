'use client';

import dynamic from 'next/dynamic';

const Map = dynamic<any>(() => import('../../../modules/Map/Map').then((module) => module.Map), {
  ssr: false,
});

export default function MapPage() {
  return <Map />;
}
