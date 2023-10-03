import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import { memo, useEffect, useMemo } from 'react';

import { concluded } from '@/assets/icons/concluido';

import { useMap } from '../../context/MapContext';

type CustomFeature = Feature<Point> & { isATool?: boolean };

type PointType = {
  id: string;
  coordinate: number[];
  status?: string;
};

export type PointsLayerProps = {
  isActive?: boolean;
  distance?: number;
  minDistance?: number;
  data: PointType[];
};

const Base = ({ data, isActive = true }: PointsLayerProps): JSX.Element | null => {
  const { map } = useMap();

  const features = useMemo(
    () =>
      data?.map(({ ...data }) => {
        const newFeature: CustomFeature = new Feature({ geometry: new Point(data.coordinate) });
        newFeature.setId(data.id);
        newFeature.setProperties({
          ...data,
        });

        newFeature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              scale: 0.85,
              src: 'data:image/svg+xml;utf8,' + encodeURIComponent(concluded),
            }),
          }),
        );

        newFeature.isATool = true;
        return newFeature;
      }),
    [data],
  );

  const source = useMemo(
    () =>
      new VectorSource({
        features,
      }),
    [features],
  );

  const points = useMemo(() => {
    return new VectorLayer({
      source,
      zIndex: 4,
    });
  }, [source]);

  useEffect(() => {
    if (!isActive) {
      map?.removeLayer(points);
      return;
    }

    map?.addLayer(points);

    return () => {
      map?.removeLayer(points);
    };
  }, [points, map, isActive]);

  return null;
};

export const PointsLayer = memo(Base);
