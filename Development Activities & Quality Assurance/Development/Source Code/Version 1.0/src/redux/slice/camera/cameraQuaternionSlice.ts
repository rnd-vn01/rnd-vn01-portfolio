import { createSlice } from '@reduxjs/toolkit';

export const initialStateCameraQuaternionSlice = {
  x: 0,
  y: 0,
  z: 0,
  w: 0
} as ICameraQuaternionSlice;

export const cameraQuaternionSlice = createSlice({
  name: 'camera/quaternionSlice@',
  initialState: initialStateCameraQuaternionSlice,
  reducers: {
    resetToInitialStateCreateOrderSlice(state) {
      state.x = 0;
      state.y = 0;
      state.z = 0;
      state.w = 0;
    },

    setStateCameraQuaternion(state, action) {
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.z = action.payload.z;
      state.w = action.payload.w;
    }
  },
});

const { actions, reducer } = cameraQuaternionSlice;
export const { resetToInitialStateCreateOrderSlice, 
  setStateCameraQuaternion } = actions;
export default reducer;
