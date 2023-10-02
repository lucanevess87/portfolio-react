import * as OpenLayers from 'ol';
import { Coordinate } from 'ol/coordinate';
import OpenLayersMap from 'ol/Map';
import { get } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import { StyleLike } from 'ol/style/Style';
import proj4 from 'proj4';
import { createContext, ReactNode, useEffect, useRef, useState } from 'react';

import { secondaryVectorLayerStyle } from '../../styles/layers';
import { VectorLayer } from '../Layers/VectorLayer';

type MapContextProps = {
  map: OpenLayersMap | null;
};

export type BaseMapProps = {
  zoom: number;
  center: Coordinate;
  vectorLayers?: Array<{
    source: any;
    options?: {
      style?: StyleLike;
    };
  }>;
  customMap?: OpenLayersMap;
  key?: string;
  children?: ReactNode;
};

export const BaseMapContext = createContext({} as unknown as MapContextProps);

export const BaseMap = ({ zoom, center, vectorLayers, customMap, children }: BaseMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<OpenLayersMap | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const mapContainer = mapRef.current;
    if (!initialized || !mapContainer) return;
    const options = {
      view: new OpenLayers.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };

    const mapObject = customMap ?? new OpenLayers.Map(options);
    mapObject.setTarget(mapContainer);
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, [zoom, center, customMap, initialized]);

  useEffect(() => {
    if (!map) return;

    map.getView().setZoom(zoom);
  }, [zoom, map]);

  useEffect(() => {
    if (!map) return;

    map.getView().setCenter(center);
  }, [center, map]);

  useEffect(() => {
    proj4.defs(
      'EPSG:29193',
      '+proj=utm +zone=23 +south +ellps=aust_SA +towgs84=-67.35,3.88,-38.22,0,0,0,0 +units=m +no_defs',
    );
    proj4.defs(
      'EPSG:4618',
      '+proj=longlat +ellps=aust_SA +towgs84=-67.35,3.88,-38.22,0,0,0,0 +no_defs',
    );
    proj4.defs(
      'EPSG:31983',
      '+proj=utm +zone=23 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
    );
    proj4.defs(
      'EPSG:4326',
      '+proj=utm +zone=23 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
    );
    register(proj4);

    const espgProj = get('EPSG:4326');

    if (espgProj) {
      espgProj.setExtent([-2921477.7, 819809.48, 2362970.26, 13797833.54]);
      espgProj.setWorldExtent([-122.19, -59.87, -25.28, 32.72]);
      espgProj.setGlobal(true);
    }

    setInitialized(true);
  }, []);

  if (!initialized) return null;

  return (
    <BaseMapContext.Provider value={{ map }}>
      <div ref={mapRef} className="w-full h-full overflow-hidden rounded-2xl">
        {vectorLayers?.map(({ source, options = {} }, index) => (
          <VectorLayer
            key={index}
            source={source}
            style={options.style ?? secondaryVectorLayerStyle}
            zIndex={1}
          />
        ))}
        {children}
      </div>
    </BaseMapContext.Provider>
  );
};
