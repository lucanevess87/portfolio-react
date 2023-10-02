import { Feature } from 'ol';
import { Fill, Icon, Style, Text } from 'ol/style';

import { cluster } from '@/assets/icons/cluster';

export const pointStyle = (size: number, scale?: number): Style =>
  new Style({
    image: new Icon({
      src: 'data:image/svg+xml;utf8,' + encodeURIComponent(cluster),
      scale: scale ?? 0.85,
    }),
    text: new Text({
      scale: 1.25,
      textBaseline: 'bottom',
      justify: 'center',
      textAlign: 'center',
      text: size === 1 ? '' : size.toString(),
      fill: new Fill({
        color: '#fff',
      }),
    }),
  });

export const iconStyle = (clusterMember: Feature, marker: string, size?: number): Style => {
  return new Style({
    geometry: clusterMember.getGeometry(),
    image: new Icon({
      src: 'data:image/svg+xml;utf8,' + encodeURIComponent(marker),
      scale: size ?? 0.85,
    }),
  });
};
