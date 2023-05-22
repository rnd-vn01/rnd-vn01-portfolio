import { createSlice } from '@reduxjs/toolkit';

export const initialStateGlobalSlice = {
  modelLoaded: false,
} as IGlobalSlice;

export const globalSlice = createSlice({
  name: 'global/globalSlice@',
  initialState: initialStateGlobalSlice,
  reducers: {
    resetToInitialStateGlobalSlice(state) {
      state.modelLoaded = false;
    },

    setModelLoaded(state, action) {
      state.modelLoaded = action.payload.modelLoaded;
    }
  },
});

const { actions, reducer } = globalSlice;
export const { resetToInitialStateGlobalSlice, setModelLoaded } = actions;
export default reducer;
