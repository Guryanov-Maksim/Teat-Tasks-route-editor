import React, { useState, useEffect } from 'react';
import { Map, Polyline, Placemark } from 'react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';

import { updateLocation } from './mapSlice.js';

// const cityMock = {
//   '1': 'Самара, Россия',
//   'Волгоград, Россия': [48.707067, 44.516975],
// };

const YandexMap = ({ setYmapsInstance, setPlacemark }) => {
  const dispatch = useDispatch();
  const [polyline, setPolyline] = useState(null);
  const mapDefaultState = { center: [55.75, 37.57], zoom: 9 };
  const { placemarkCoords, mapState, points } = useSelector((state) => state.map);
  const pointsCoordinates = points.map(({ coordinates }) => coordinates);
  // ymaps.setBounds(ref.geometry.getBounds());

  useEffect(() => {
    if (polyline) {
      polyline.editor.events.add(['vertexdragend'], (e) => {
        const vertexModel = e.get('vertexModel');
        const index = vertexModel._index;
        const newCoords = vertexModel.geometry._coordinates;
        const newPointName = 'Самара, Россия';
        dispatch(updateLocation({ index, newCoords, newPointName }));
      });
    }
  }, [polyline]);

  return (
    <div>
      My awesome application with maps!
      <Map
        instanceRef={(ref) => ref && setYmapsInstance(ref)}
        defaultState={mapDefaultState}
        state={mapState}
        modules={['geoObject.addon.editor', 'SuggestView', 'suggest', 'geocode', 'Placemark', 'Polyline']}
      >
        {points.length > 0 && (
          <Polyline
            instanceRef={(ref) => {
              if (!ref) {
                return;
              }
              ref.editor.startDrawing();
              setPolyline(ref);
            }} // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs   https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
            geometry={pointsCoordinates}
            options={{
              // balloonCloseButton: true,
              strokeColor: '#000',
              strokeWidth: 4,
              strokeOpacity: 0.5,
              editorMaxPoints: 1,
            }}
          />
        )}
        {
          placemarkCoords && (
          <Placemark
            geometry={placemarkCoords}
            instanceRef={(ref) => ref && setPlacemark(ref)}
          />
          )
        }
      </Map>
    </div>
  );
};

export default YandexMap;
