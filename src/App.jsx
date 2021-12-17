import React, { useState } from 'react';
import { YMaps } from 'react-yandex-maps';
import { Provider } from 'react-redux';

import store from './store.js';
import SendForm from './SendForm.jsx';
import YandexMap from './features/map/Map.jsx';
import Points from './points.jsx';

const App = () => {
  const [ymapsInstance, setYmapsInstance] = useState(null);
  const [placemark, setPlacemark] = useState(null);

  return (
    <Provider store={store}>
      <YMaps query={{
        apikey: '48c83221-ea67-4ada-abb6-d05f32ffa30d',
      }}
      >
        <SendForm
          ymapsInstance={ymapsInstance}
          placemark={placemark}
        />
        <YandexMap
          setYmapsInstance={setYmapsInstance}
          setPlacemark={setPlacemark}
        />
        <Points />
      </YMaps>
    </Provider>
  );
};

export default App;
