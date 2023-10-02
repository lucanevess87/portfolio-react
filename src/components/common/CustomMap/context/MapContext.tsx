import { Map } from 'ol';
import { Geometry } from 'ol/geom';
import BaseLayer from 'ol/layer/Base';
import OLTileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { createContext, ReactNode, useContext } from 'react';

import { MapControlProvider } from './MapControlContext';

type MapContextData = {
  map?: Map | null;
  removeLayer: (layer: CustomLayer) => void;
};

type MapProviderProps = {
  children: ReactNode;
  map: Map | null;
};

export type CustomLayer = VectorLayer<VectorSource<Geometry>> & {
  id?: string;
  color?: string;
  isActive?: boolean;
  father?: string;
  name?: string;
  itIsOuterLayer?: boolean;
  isBaseLayer?: boolean;
};

export type CustomBaseLayer = BaseLayer & {
  id?: string;
  color?: string;
  isActive?: boolean;
  name?: string;
  itIsOuterLayer?: boolean;
  isBaseLayer?: boolean;
};

export type CustomOlTyleLayer = OLTileLayer<XYZ> & { name?: string };

const MapContext = createContext({} as MapContextData);

const MapProvider = ({ children, map }: MapProviderProps): JSX.Element => {
  const removeLayer = (layer: CustomLayer): void => {
    map?.removeLayer(layer);
  };

  return (
    <MapContext.Provider
      value={{
        map,
        removeLayer,
      }}
    >
      <MapControlProvider>{children}</MapControlProvider>
    </MapContext.Provider>
  );
};

export const useMap = (): MapContextData => useContext(MapContext);

export { MapProvider, MapContext };
