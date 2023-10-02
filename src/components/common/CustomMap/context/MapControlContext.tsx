import BaseLayer from 'ol/layer/Base';
import OLTileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { createContext, ReactNode, useContext, useState } from 'react';

import { getLayers } from '../utils/getLayers';

import { CustomLayer, useMap } from './MapContext';

type MapControlContextData = {
  changeCurrentBase: (value: 'osm' | 'imagery') => void;
  lastLayer:
    | (BaseLayer & {
        name?: string | undefined;
      })
    | undefined;
  baseLayers: CustomLayer[];
};

type MapControlProviderProps = {
  children: ReactNode;
};

export type CustomOlTyleLayer = OLTileLayer<XYZ> & { name?: string };

const MapControlContext = createContext({} as MapControlContextData);

const MapControlProvider = ({ children }: MapControlProviderProps): JSX.Element => {
  const { map } = useMap();

  const baseLayers = getLayers(map).filter((layer) => !!layer?.isBaseLayer);

  const [lastLayer, setLastLayer] = useState<(BaseLayer & { name?: string }) | undefined>(
    baseLayers.at(-1),
  );

  const changeCurrentBase = (value: string): void => {
    const currentBaseLayer = baseLayers.find((layer) => {
      if (layer.name === value) {
        return true;
      }
      return false;
    });

    baseLayers.forEach((layer) => {
      if (layer?.name !== currentBaseLayer?.name) {
        layer.setVisible(false);
      }
    });

    if (currentBaseLayer) {
      currentBaseLayer.setVisible(true);
      setLastLayer(currentBaseLayer);
    }
  };

  return (
    <MapControlContext.Provider
      value={{
        changeCurrentBase,
        lastLayer,
        baseLayers,
      }}
    >
      {children}
    </MapControlContext.Provider>
  );
};

export const useControlMap = (): MapControlContextData => useContext(MapControlContext);

export { MapControlProvider, MapControlContext };
