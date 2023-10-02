import OLTileLayer from 'ol/layer/Tile';
import { OSM, XYZ } from 'ol/source';

import { MAPBOX_TOKEN } from '@/config';

export type CustomBaseLayer = {
  name: string;
  source: XYZ | OSM;
  visible?: boolean;
};

export const layers: CustomBaseLayer[] = [
  {
    name: 'osm',
    source: new OSM(),
    visible: false,
  },
  {
    name: 'mapbox',
    source: new XYZ({
      url: `https://api.mapbox.com/styles/v1/tech-loomi/clilriln4010p01p1g1qrf51d/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
    }),
    visible: true,
  },
];

export const getDefaultLayers = (customLayers: CustomBaseLayer[] = []) => {
  const baseLayers = [...customLayers, ...layers].map(({ source, name, visible = true }) => {
    const newLayer: OLTileLayer<XYZ> & {
      name?: string;
      isBaseLayer?: boolean;
    } = new OLTileLayer({
      source,
      visible,
      zIndex: 1,
    });
    newLayer.name = name;
    newLayer.isBaseLayer = true;

    return newLayer;
  });

  return [...baseLayers];
};
