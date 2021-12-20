import { configureStore } from '@reduxjs/toolkit';

import mapReducer from './features/map/mapSlice.js';
import pointsFormReducer from './features/pointsFrom/pointsFormSlice.js';

const store = configureStore({
  reducer: {
    map: mapReducer,
    pointsForm: pointsFormReducer,
  },
});

export default store;
