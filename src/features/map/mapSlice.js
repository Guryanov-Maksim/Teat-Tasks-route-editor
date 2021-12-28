import { createSlice } from '@reduxjs/toolkit';

// const pointsForDevelop = [
//   { id: '1', address: 'Россия, Москва', coordinates: [55.75322, 37.622513] },
//   { id: '2', address: 'Россия, Ростов-на-Дону', coordinates: [47.222078, 39.720358] },
//   { id: '3', address: 'Россия, Самара', coordinates: [53.195878, 50.100202] },
//   { id: '4', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '5', address: 'Молдова, Кишинёв', coordinates: [47.032307, 28.832345] },
//   { id: '6', address: 'Россия, Москва', coordinates: [55.75322, 37.622513] },
//   { id: '7', address: 'Россия, Ростов-на-Дону', coordinates: [47.222078, 39.720358] },
//   { id: '8', address: 'Россия, Самара', coordinates: [53.195878, 50.100202] },
//   { id: '9', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '10', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '11', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '12', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '13', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '14', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '15', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '16', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '17', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '18', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '19', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '20', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '21', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '22', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '23', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '24', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '25', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '26', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '27', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '28', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
//   { id: '29', address: 'Россия, Вологда', coordinates: [59.220501, 39.891523] },
// ];

const initialState = {
  points: [],
  newestPointBounds: [],
  // points: pointsForDevelop,
};

export const counterSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    addPoint: (state, action) => {
      const { bounds } = action.payload;
      state.points.push(action.payload);
      state.newestPointBounds = bounds; // eslint-disable-line no-param-reassign
    },
    updatePoint: (state, action) => {
      const { id } = action.payload;
      state.points = state.points.map((point) => ( // eslint-disable-line no-param-reassign
        point.id === id
          ? action.payload
          : point
      ));
    },
    reorderPoints: (state, action) => {
      state.points = action.payload; // eslint-disable-line no-param-reassign
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
