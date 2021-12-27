import React, { useState, useEffect } from 'react';
import { Map } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

import PointsOnMap from '../../PointsOnMap.jsx';
import Route from '../../Route.jsx';

const isLessThenTwoPoints = (points) => points.length < 2;

const YandexMap = () => {
  const mapDefaultState = { center: [55.75, 37.57], zoom: 9 };
  const [ymapsInstance, setYmapsInstance] = useState();
  const { newestPointBounds, points } = useSelector((state) => state.map);

  useEffect(() => {
    if (isLessThenTwoPoints(points)) {
      ymapsInstance?.setBounds(newestPointBounds, {
        // Checking the availability of tiles at the given zoom level.
        checkZoomRange: true,
      });
    }
  }, [newestPointBounds]);

  return (
    <Card className="d-flex h-100">
      <Map
        instanceRef={(ref) => ref && setYmapsInstance(ref)}
        defaultState={mapDefaultState}
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
