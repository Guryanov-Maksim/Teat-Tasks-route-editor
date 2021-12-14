import { createSlice } from '@reduxjs/toolkit';

const moscowCoords = [55.75, 37.57];

const initialState = {
  placemarkCoords: null,
  mapState: { center: moscowCoords, zoom: 9 },
  points: [],
};

export const counterSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    addPlacemark: (state, action) => {
      state.placemarkCoords = action.payload;
      state.mapState = { center: action.payload, zoom: 9 };
    },
    removePlacemark: (state) => {
      state.placemarkCoords = null;
    },
    updateLocation: (state, action) => {
      const { index, newCoords } = action.payload;
      state.points[index] = newCoords;
    },
    addLocation: (state, action) => {
      state.points.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addPlacemark,
  removePlacemark,
  addLocation,
  updateLocation,
} = counterSlice.actions;

export default counterSlice.reducer;
