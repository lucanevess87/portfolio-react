import { Geometry } from 'ol/geom';
import { Select } from 'ol/interaction';
import OLVectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import { useEffect, useMemo } from 'react';

import { useMap } from '../../context/MapContext';
import { uuidV4 } from '../../utils/uuid';

type VectorLayerProps = {
  source: VectorSource<Geometry>;
  zIndex?: number;
  style?: Style;
  id?: string;
  color?: string;
  visible?: boolean;

  name?: string;
  itIsOuterLayer?: boolean;
  vectorLayerProps?: Record<string, any>;
  selectIteration?: Select;
};

type CustomVectorLayer = OLVectorLayer<VectorSource<Geometry>> & {
  id?: string;
  color?: string;
  categories?: string[];
  isActive?: boolean;
  father?: string;
  name?: string;
  itIsOuterLayer?: boolean;
};

// eslint-disable-next-line unused-imports/no-unused-vars
export const CustomVectorLayer = ({
  source,
  zIndex = 1,
  style,
  id,
  color,
  visible = true,
  name,
  itIsOuterLayer = false,
  vectorLayerProps = {},
  selectIteration,
}: VectorLayerProps): null => {
  const { map } = useMap();

  const vectorLayer: CustomVectorLayer = useMemo(
    () =>
      new OLVectorLayer({
        source,
        style: (feature) => {
          const status = feature.get('status');

          return new Style({
            fill: new Fill({
              color: status === 'concluded' ? color : 'rgba(133, 133, 133, 0.4)',
            }),
            stroke: new Stroke({
              color: status === 'concluded' ? color : 'rgba(133, 133, 133, 0.4)',
              width: 3,
            }),
          });
        },
        opacity: visible ? 1 : 0,
        properties: {
          itIsOuterLayer,
        },
      }),
    [color, itIsOuterLayer, source, visible],
  );

  useEffect(() => {
    if (!map) return;

    const newId = id ?? uuidV4();

    vectorLayer.id = newId;
    vectorLayer.color = color ?? 'red';
    vectorLayer.setZIndex(zIndex);
    vectorLayer.isActive = visible;
    vectorLayer.name = name;

    vectorLayer
      .getSource()
      ?.getFeatures()
      .forEach((feature) => {
        feature?.getGeometry()?.setProperties({
          itIsOuterLayer,
          ...vectorLayerProps,
        });
      });

    vectorLayer.itIsOuterLayer = itIsOuterLayer;

    map?.addLayer(vectorLayer);

    if (!visible) {
      setTimeout(() => {
        vectorLayer.setVisible(false);
      }, 1000);
    }

    if (selectIteration) {
      const feature = vectorLayer?.getSource()?.getFeatures();

      feature && selectIteration.getFeatures().extend(feature);
    }

    return () => {
      map?.removeLayer(vectorLayer);
    };
  }, [
    map,
    source,
    style,
    zIndex,
    id,
    color,
    visible,
    name,
    itIsOuterLayer,
    vectorLayerProps,
    vectorLayer,
    selectIteration,
  ]);

  return null;
};
