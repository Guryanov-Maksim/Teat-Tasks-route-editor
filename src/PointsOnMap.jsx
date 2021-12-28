import React, { useState, useEffect } from 'react';
import { Placemark, withYMaps } from 'react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';

import { updatePoint, selectPoints } from './features/map/mapSlice.js';

const Points = ({ ymaps }) => {
  const dispatch = useDispatch();
  const points = useSelector(selectPoints);
  const [placemarkInstance, setPlacemarkInstance] = useState(null);

  useEffect(() => {
    if (placemarkInstance) {
      placemarkInstance.events.add(['dragend'], async (e) => {
        const target = e.get('target');
        const newCoords = target.geometry.getCoordinates();
        const pointId = placemarkInstance.properties.get('pointId');

        ymaps.geocode(newCoords)
          .then(
            (response) => {
              const firstFoundObject = response.geoObjects.get(0);
              if (!firstFoundObject) {
                console.error('TODO: come up with an error');
                return;
              }
              const coordinates = firstFoundObject.geometry.getCoordinates();
              const address = firstFoundObject.getAddressLine();
              const newPointData = { id: pointId, coordinates, address };
              dispatch(updatePoint(newPointData));
            },
            (error) => {
              console.error(error);
            },
          );
      });
    }
  }, [placemarkInstance]);

  return (
    <>
      {points.map(({ coordinates, address, id }) => (
        <Placemark
          key={id}
          geometry={coordinates}
          instanceRef={(ref) => ref && setPlacemarkInstance(ref)}
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
