import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style, { StyleLike } from 'ol/style/Style';

export const mainVectorLayerStyle: StyleLike = new Style({
  stroke: new Stroke({
    color: 'blue',
    width: 1,
  }),
  fill: new Fill({
    color: '#70768924',
  }),
});

export const secondaryVectorLayerStyle: StyleLike = new Style({
  stroke: new Stroke({
    color: '#EC6666',
    width: 2,
  }),
  fill: new Fill({
    color: '#EC666624',
  }),
});
