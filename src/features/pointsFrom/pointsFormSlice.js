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
    setLoadingState: (state) => {
      /* eslint-disable no-param-reassign */
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
      /* eslint-enable no-param-reassign */
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoadingState,
  setFailedState,
  setSuccessfulState,
  setInvalidlState,
} = pointsFormSlice.actions;

export default pointsFormSlice.reducer;

export const selectFormState = (state) => state.pointsForm;
