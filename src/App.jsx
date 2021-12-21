import React, { useState } from 'react';
import { YMaps } from 'react-yandex-maps';

import PointsForm from './features/pointsFrom/PointsForm.jsx';
import YandexMap from './features/map/Map.jsx';
import Points from './Points.jsx';

const App = () => {
  const [ymapsInstance, setYmapsInstance] = useState(null);
  const [placemark, setPlacemark] = useState(null);

  return (
    <YMaps query={{
      apikey: '48c83221-ea67-4ada-abb6-d05f32ffa30d',
    }}
    >
      <PointsForm
        ymapsInstance={ymapsInstance}
        placemark={placemark}
      />
      <YandexMap
        setYmapsInstance={setYmapsInstance}
        setPlacemark={setPlacemark}
      />
      <Points />
    </YMaps>
  );
};

export default App;
