import { Map } from 'ol';

import { CustomLayer } from '../context/MapContext';

export const getLayers = (map: Map | null | undefined): CustomLayer[] => {
  return [...(map?.getLayers().getArray() as CustomLayer[])];
};
