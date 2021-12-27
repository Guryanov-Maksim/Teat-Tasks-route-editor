import React from 'react';
import { Polyline } from 'react-yandex-maps';
import { useSelector } from 'react-redux';

const Route = () => {
  const { points } = useSelector((state) => state.map);
  const pointsCoordinates = points.map(({ coordinates }) => coordinates);

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
