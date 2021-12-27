import React, { useState } from 'react';
import { Map } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

import PointsOnMap from '../../PointsOnMap.jsx';
import Route from '../../Route.jsx';

const YandexMap = () => {
  const mapDefaultState = { center: [55.75, 37.57], zoom: 9 };
  const { mapState } = useSelector((state) => state.map);
  const [ymapsInstance, setYmapsInstance] = useState();

  return (
    <Card className="d-flex h-100">
      <Map
        instanceRef={(ref) => ref && setYmapsInstance(ref)}
        defaultState={mapDefaultState}
        state={mapState}
        className="h-100 w-100"
        modules={['geoObject.addon.editor', 'SuggestView', 'suggest', 'geocode', 'Placemark', 'Polyline', 'geoObject.addon.balloon']}
      >
        <Route ymapsInstance={ymapsInstance} />
        <PointsOnMap />
      </Map>
    </Card>
  );
};

export default YandexMap;
