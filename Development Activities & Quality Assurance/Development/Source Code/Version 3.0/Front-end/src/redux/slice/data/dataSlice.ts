import { createSlice } from '@reduxjs/toolkit';

export const initialStateDataSlice = {
  acupuncturePoints: [],
  meridians: []
} as IDataSlice;

export const dataSlice = createSlice({
  name: 'data/dataSlice@',
  initialState: initialStateDataSlice,
  reducers: {
    resetToInitialStateDataSlice(state) {
      state.acupuncturePoints = [];
      state.meridians = [];
    },

    setAcupuncturePoints(state, action) {
      state.acupuncturePoints = action.payload;
    },

    setMeridians(state, action) {
      state.meridians = action.payload;
    }
  },
});

const { actions, reducer } = dataSlice;
export const { resetToInitialStateDataSlice, setAcupuncturePoints, setMeridians } = actions;
export default reducer;
