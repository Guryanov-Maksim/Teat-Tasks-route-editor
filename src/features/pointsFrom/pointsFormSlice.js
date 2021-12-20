import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sendingState: 'filling',
  error: null,
  validationState: 'valid',
};

export const pointsFormSlice = createSlice({
  name: 'pointForm',
  initialState,
  reducers: {
    send: (state) => {
      state.sendingState = 'loading';
      state.error = null;
      state.invalid = false;
    },
    setFailedState: (state, action) => {
      state.sendingState = 'failed';
      state.error = action.payload;
      state.invalid = false;
    },
    setSuccessfulState: (state) => {
      state.sendingState = 'filling';
      state.error = null;
      state.invalid = false;
    },
    setInvalidlState: (state) => {
      state.sendingState = 'failed';
      state.error = null;
      state.invalid = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  send,
  setFailedState,
  setSuccessfulState,
  setInvalidlState,
} = pointsFormSlice.actions;

export default pointsFormSlice.reducer;
