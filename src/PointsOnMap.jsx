import React, { useState, useEffect } from 'react';
import { Placemark, withYMaps } from 'react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';

import { updatePoint } from './features/map/mapSlice.js';

const Points = ({ ymaps }) => {
  const dispatch = useDispatch();
  const { points } = useSelector((state) => state.map);
  const [pl, setPl] = useState(null);

  useEffect(() => {
    if (pl) {
      pl.events.add(['dragend'], async (e) => {
        const target = e.get('target');
        const newCoords = target.geometry.getCoordinates();
        const pointId = pl.properties.get('pointId');
        // const res = await ymaps.geocode(newCoords);
        // console.log(res.geoObjects.get(0).getAddressLine());
        const newAddress = 'Самара, Россия';
        dispatch(updatePoint({ id: pointId, coordinates: newCoords, address: newAddress }));
      });
    }
  }, [pl]);

  return (
    <>
      {points.map(({ coordinates, address, id }) => (
        <Placemark
          key={id}
          geometry={coordinates}
          instanceRef={(ref) => {
            if (ref) {
              // setPlacemark(ref);
              setPl(ref);
              // ref.events.add(['dragend'], (e) => {
              //   console.log(e);
              //   const vertexModel = e.get('vertexModel');
              //   const index = vertexModel._index;
              //   const newCoords = vertexModel.geometry._coordinates;
              //   console.log(e);
              //   // const res = await ymaps.geocode(e.originalEvent.item.displayName);
              // // console.log(res.geoObjects.get(0).geometry.getCoordinates());
              //   const newPointName = 'Самара, Россия';
              //   dispatch(updateLocation({ index, newCoords, newPointName }));
              // });
            }
          }}
          properties={{
            hintContent: address,
            balloonContentHeader: address,
            balloonContentBody: "Capital of Russia",
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
