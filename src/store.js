import { configureStore } from '@reduxjs/toolkit';

import mapReducer from './features/map/mapSlice.js';

const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

export default store;
