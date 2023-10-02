import { GeoJSON } from 'ol/format';
import { Select } from 'ol/interaction';
import { get, ProjectionLike } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import { FeatureCollectionWithFilename } from 'shpjs';

import { CustomVectorLayer } from '../Layers/CustomVectorLayer';

type GeoJsonLayerProps = {
  source: FeatureCollectionWithFilename | undefined;
  name: string;
  customColor?: string;
  strokeColor?: string;
  itIsOuterLayer?: boolean;
  zIndex?: number;
  visible?: boolean;
  vectorLayerProps?: Record<string, any>;
  id?: string;
  selectIteration?: Select;
  projection?: ProjectionLike;
};

export const GeoJsonLayer = ({
  source,
  name,
  customColor = '#5AB116',
  strokeColor = '#5AB116',
  itIsOuterLayer = false,
  zIndex = 5,
  visible = true,
  id,
  vectorLayerProps,
  selectIteration,
  projection = 'EPSG:4326',
}: GeoJsonLayerProps): JSX.Element => {
  const style = new Style({
    fill: new Fill({
      color: customColor,
    }),
    stroke: new Stroke({
      color: strokeColor,
      width: 3,
    }),
  });

  const newLayer = new VectorSource({
    features: new GeoJSON().readFeatures(source, {
      featureProjection: get(projection) as ProjectionLike,
    }),
    format: new GeoJSON(),
  });

  return (
    <CustomVectorLayer
      source={newLayer}
      style={style}
      zIndex={zIndex}
      color={customColor}
      visible={visible}
      name={name}
      itIsOuterLayer={itIsOuterLayer}
      vectorLayerProps={vectorLayerProps}
      selectIteration={selectIteration}
      {...(id && { id })}
    />
  );
};
