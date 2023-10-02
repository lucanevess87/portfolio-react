import * as ol from 'ol';
import { Projection } from 'ol/proj';
import { ViewOptions } from 'ol/View';
import { useMemo } from 'react';

import { BaseMap } from './components/BaseMap/BaseMap';
import { MapProvider } from './context/MapContext';
import { getDefaultLayers } from './getDefaultLayers';

const newProjection = new Projection({
  code: 'EPSG:4326',
  extent: [-180, -90, 180, 90],
});

export type CustomMapProps = {
  children: JSX.Element;
  currentCenter?: number[];
  zoom?: number;
  viewProps?: ViewOptions;
};

export const CustomMap = ({
  children,
  currentCenter = [-34.903625622434525, -8.04533863019519],
  zoom = 15,
  viewProps,
}: CustomMapProps) => {
  const view = useMemo(
    () => new ol.View({ zoom, projection: newProjection, ...viewProps }),
    [viewProps, zoom],
  );

  const map = useMemo(
    () =>
      new ol.Map({
        view,
        layers: getDefaultLayers(),
        controls: [],
      }),
    [view],
  );

  return (
    <MapProvider map={map}>
      <div className="flex flex-col w-full h-full transition-all">
        <div id="fullscreen" className="relative flex flex-col w-full h-full fullscreen">
          <BaseMap center={currentCenter} zoom={zoom} customMap={map} />
          {children}
        </div>
      </div>
    </MapProvider>
  );
};
