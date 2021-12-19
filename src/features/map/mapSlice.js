import { bindActionCreators, createSlice } from '@reduxjs/toolkit';

const moscowCoords = [55.75, 37.57];

const initialState = {
  mapState: { center: moscowCoords, zoom: 9 },
  points: [],
};

export const counterSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    addPoint: (state, action) => {
      const { coordinates } = action.payload;
      state.points.push(action.payload);
      state.mapState = { center: coordinates, zoom: 9 };
    },
    updatePoint: (state, action) => {
      const { id } = action.payload;
      state.points = state.points.map((point) => (
        point.id === id
          ? action.payload
          : point
      ));
    },
    reorderPoints: (state, action) => {
      state.points = action.payload;
    },
    removePoint: (state, action) => {
      state.points.splice(action.payload, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addPoint,
  updatePoint,
  reorderPoints,
  removePoint,
} = counterSlice.actions;

export default counterSlice.reducer;
