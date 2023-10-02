import { Feature, MapBrowserEvent } from 'ol';
import { boundingExtent } from 'ol/extent';
import { FeatureLike } from 'ol/Feature';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { Cluster } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { memo, useCallback, useEffect, useMemo } from 'react';

import { concluded } from '@/assets/icons/concluido';

import { useMap } from '../../context/MapContext';
import { iconStyle } from '../../styles/clustersStyle';

type CustomFeature = Feature<Point> & { isATool?: boolean };

export type ClusterLayerProps = {
  isActive?: boolean;
  distance?: number;
  minDistance?: number;
};

const styleCache: Record<number, any> = {};

const Base = ({
  isActive = true,
  distance = 15,
  minDistance = 15,
}: ClusterLayerProps): JSX.Element | null => {
  const { map } = useMap();

  const content = useMemo(() => {
    const data = [{ coordinate: [], id: '123' }];
    return data;
  }, []);

  const features = useMemo(
    () =>
      content?.map(({ ...content }) => {
        const newFeature: CustomFeature = new Feature({ geometry: new Point(content.coordinate) });
        newFeature.setId(content.id);
        newFeature.setProperties({
          ...content,
        });

        newFeature.isATool = true;
        return newFeature;
      }),
    [content],
  );

  const source = useMemo(
    () =>
      new VectorSource({
        features,
      }),
    [features],
  );

  const clusterSource = useMemo(
    () =>
      new Cluster({
        distance: Math.trunc(distance),
        minDistance: Math.trunc(minDistance),
        source,
      }),
    [source, distance, minDistance],
  );

  const changeColor = useCallback((feature: FeatureLike) => {
    const size = feature.get('features').length;
    let style = styleCache[size];

    style = iconStyle(feature as Feature, concluded);
    styleCache[size] = style;
    return style;
  }, []);

  const clusters = useMemo(() => {
    return new VectorLayer({
      source: clusterSource,
      style: changeColor,
      zIndex: 100,
    });
  }, [changeColor, clusterSource]);

  useEffect(() => {
    if (!isActive) {
      map?.removeLayer(clusters);
      return;
    }

    map?.addLayer(clusters);

    return () => {
      map?.removeLayer(clusters);
    };
  }, [clusters, map, isActive]);

  const handleMapClick = useCallback(
    async (event: MapBrowserEvent<any>) => {
      await clusters?.getFeatures(event.pixel)?.then((clickedFeatures) => {
        if (clickedFeatures.length) {
          const features = clickedFeatures[0].get('features');

          if (features.length >= 1) {
            const extent = boundingExtent(
              features.map((r: any) => r?.getGeometry()?.getCoordinates()),
            );

            map?.getView()?.fit(extent, {
              duration: 800,
              padding: [50, 50, 50, 50],
              maxZoom: 18,
            });
          }
        }
      });
    },
    [clusters, map],
  );

  useEffect(() => {
    map?.on('pointermove', function (e) {
      const pixel = map.getEventPixel(e.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getViewport().style.cursor = hit ? 'pointer' : '';
    });
  }, [map]);

  useEffect(() => {
    map?.on('click', handleMapClick);

    return () => {
      map?.un('click', handleMapClick);
    };
  }, [handleMapClick, map]);

  return null;
};

export const ClusterLayer = memo(Base);
