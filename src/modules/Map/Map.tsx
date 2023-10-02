import { Fragment } from 'react';
import { FeatureCollectionWithFilename } from 'shpjs';

import { CustomMap } from '@/components/common/CustomMap';
import { GeoJsonLayer } from '@/components/common/CustomMap/components/GeoJsonLayer/GeoJsonLayer';
import { PointsLayer } from '@/components/common/CustomMap/components/PointsLayer/PointsLayer';
import { useMapTeamsData } from '@/hooks/useMapTeamsData';

export const Map = () => {
  const { pointsLayerData, geoJsonLayerData } = useMapTeamsData();
  return (
    <div className="w-full h-full p-10">
      <CustomMap
        viewProps={{
          minZoom: 13,
        }}
        currentCenter={[-34.88184162921187, -8.055040945049246]}
      >
        <Fragment>
          <PointsLayer isActive={true} data={pointsLayerData} />
          {geoJsonLayerData.map((feature, index) => {
            return (
              <GeoJsonLayer
                name="Teste"
                source={feature as unknown as FeatureCollectionWithFilename}
                zIndex={3}
                key={index}
              />
            );
          })}
        </Fragment>
      </CustomMap>
    </div>
  );
};
