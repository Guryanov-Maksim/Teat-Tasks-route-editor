import { configureStore } from '@reduxjs/toolkit';

import mapReducer from './features/map/mapSlice.js';
import pointsFormReducer from './features/pointsFrom/pointsFormSlice.js';

// const store = configureStore({
//   reducer: {
//     map: mapReducer,
//     pointsForm: pointsFormReducer,
//   },
// });

// export default store;

// Create a configureAppStore function to create a new store for each test case.
// The store was global for all the tests without configureAppStore() call

const configureAppStore = () => {
  const store = configureStore({
    reducer: {
      map: mapReducer,
      pointsForm: pointsFormReducer,
    },
  });

  return store;
};

export default configureAppStore;
