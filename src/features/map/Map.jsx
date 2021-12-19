import React from 'react';
import { Map } from 'react-yandex-maps';
import { useSelector } from 'react-redux';

import PointsOnMap from '../../PointsOnMap.jsx';
import Route from '../../Route.jsx';

const YandexMap = ({ setYmapsInstance }) => {
  const mapDefaultState = { center: [55.75, 37.57], zoom: 9 };
  const { mapState } = useSelector((state) => state.map);

  return (
    <div>
      My awesome application with maps!
      <Map
        instanceRef={(ref) => ref && setYmapsInstance(ref)}
        defaultState={mapDefaultState}
        state={mapState}
        modules={['geoObject.addon.editor', 'SuggestView', 'suggest', 'geocode', 'Placemark', 'Polyline', 'geoObject.addon.balloon']}
      >
        <Route />
        <PointsOnMap />
      </Map>
    </div>
  );
};

export default YandexMap;
