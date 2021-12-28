import React from 'react';
import { Polyline } from 'react-yandex-maps';
import { useSelector } from 'react-redux';

import { selectPointsCoordinates } from '../features/map/mapSlice.js';

const Route = () => {
  const pointsCoordinates = useSelector(selectPointsCoordinates);

  return (
    <Polyline
      geometry={pointsCoordinates}
      options={{
        strokeColor: '#000',
        strokeWidth: 4,
        strokeOpacity: 0.5,
        editorMaxPoints: 1,
      }}
    />
  );
};

export default Route;
