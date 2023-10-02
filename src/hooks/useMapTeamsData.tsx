import { uuidV4 } from '@/components/common/CustomMap/utils/uuid';

const source = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: '0B156490452BBA8B9F9E',
      geometry: {
        type: 'LineString',
        coordinates: [
          [-34.89536884932287, -8.055796863405414],
          [-34.88999348296095, -8.057541792859041],
          [-34.88643598485775, -8.059605263618522],
          [-34.88047241879923, -8.062658051936243],
          [-34.8787424087045, -8.0603777078715],
          [-34.88294446852707, -8.057760499056524],
          [-34.88230030153578, -8.05514243889065],
          [-34.87907974464239, -8.050443117952684],
          [-34.87567258888212, -8.052742270131398],
          [-34.87796139602786, -8.056384293111579],
        ],
      },
      properties: {
        status: [
          'concluded',
          'concluded',
          'concluded',
          'concluded',
          'in_progress',
          'not_concluded',
          'not_concluded',
          'not_concluded',
          'not_concluded',
          'not_concluded',
          'not_concluded',
        ],
      },
    },
  ],
};

type GeoJSON = {
  type: string;
  features: {
    geometry: {
      coordinates: (number[] | undefined)[];
      type: string;
    };
    properties: {
      status: string;
    };
    type: string;
    id: string;
  }[];
};

type Point = {
  id: string;
  coordinate: number[];
  status: string;
};

type UseMapTeamsDataReturn = {
  geoJsonLayerData: GeoJSON[];
  pointsLayerData: Point[];
};

export const useMapTeamsData = (): UseMapTeamsDataReturn => {
  const wrappedFeature = source.features.flatMap((feature) => {
    const geometry = feature.geometry.coordinates.map((coordinate, index) => {
      const nextCoordinate = feature.geometry.coordinates.at(index + 1);
      return {
        type: 'FeatureCollection',
        features: [
          {
            ...feature,
            id: uuidV4(),
            geometry: {
              ...feature.geometry,
              coordinates: [coordinate, nextCoordinate].filter(
                (coordinate) => coordinate != undefined,
              ),
            },
            properties: {
              ...feature.properties,
              status: feature.properties.status[index],
            },
          },
        ],
      };
    });

    return geometry;
  });

  const pointsData = source.features.flatMap((feature) => {
    const geometry = feature.geometry.coordinates.map((coord, index) => {
      return {
        id: uuidV4(),
        coordinate: [coord[0], coord[1]],
        status: feature.properties.status[index],
      };
    });

    return geometry;
  });
  return { geoJsonLayerData: wrappedFeature, pointsLayerData: pointsData };
};
