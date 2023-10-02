import { GeoJSON } from 'ol/format';
import { Geometry } from 'ol/geom';
import OLVectorLayer from 'ol/layer/Vector';
import { get, ProjectionLike } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { StyleLike } from 'ol/style/Style';
import { useContext, useEffect } from 'react';

import { CustomLayer } from '../../context/MapContext';
import { BaseMapContext } from '../BaseMap/BaseMap';

type TyleLayersProps = {
  source: VectorSource<Geometry> & { id: string };
  zIndex?: number;
  style: StyleLike;
};

export const VectorLayer: React.FC<TyleLayersProps> = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(BaseMapContext);

  useEffect(() => {
    if (!map) return;

    const currentSource = new VectorSource({
      features: new GeoJSON().readFeatures(source, {
        featureProjection: get('EPSG:3857') as ProjectionLike,
      }),
      format: new GeoJSON(),
    });

    const vectorLayer: CustomLayer = new OLVectorLayer({
      source: currentSource,
      style,
      zIndex,
    });

    vectorLayer.id = source.id;

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map, source, zIndex, style]);

  return null;
};
