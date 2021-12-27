import React, { useState, useEffect } from 'react';
import { Polyline } from 'react-yandex-maps';
import { useSelector } from 'react-redux';

const isMoreThanTwoPoints = (points) => points.length > 1;

const Route = ({ ymapsInstance }) => {
  const { points } = useSelector((state) => state.map);
  const pointsCoordinates = points.map(({ coordinates }) => coordinates);
  const [polyline, setPolyline] = useState(null);

  useEffect(() => {
    if (isMoreThanTwoPoints(points)) {
      ymapsInstance.setBounds(polyline.geometry.getBounds());
    }
  }, [points.length]);

  return (
    <Polyline
      geometry={pointsCoordinates}
      instanceRef={(ref) => ref && setPolyline(ref)}
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
