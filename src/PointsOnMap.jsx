import React, { useState, useEffect } from 'react';
import { Placemark, withYMaps } from 'react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';

import { updatePoint, selectPoints } from './features/map/mapSlice.js';

const Points = ({ ymaps }) => {
  const dispatch = useDispatch();
  const points = useSelector(selectPoints);
  const [pl, setPl] = useState(null);

  useEffect(() => {
    if (pl) {
      pl.events.add(['dragend'], async (e) => {
        const target = e.get('target');
        const newCoords = target.geometry.getCoordinates();
        const pointId = pl.properties.get('pointId');

        ymaps.geocode(newCoords)
          .then(
            (response) => {
              const obj = response.geoObjects.get(0);
              if (!obj) {
                console.error('TODO: come up with an error');
                return;
              }
              const coordinates = obj.geometry.getCoordinates();
              const address = obj.getAddressLine();
              const newPointData = { id: pointId, coordinates, address };
              dispatch(updatePoint(newPointData));
            },
            (error) => {
              console.error(error);
            },
          );
      });
    }
  }, [pl]);

  return (
    <>
      {points.map(({ coordinates, address, id }) => (
        <Placemark
          key={id}
          geometry={coordinates}
          instanceRef={(ref) => ref && setPl(ref)}
          properties={{
            hintContent: address,
            balloonContentHeader: address,
            pointId: id,
          }}
          options={{
            draggable: true,
          }}
        />
      ))}
    </>
  );
};

export default withYMaps(Points, true, []);
