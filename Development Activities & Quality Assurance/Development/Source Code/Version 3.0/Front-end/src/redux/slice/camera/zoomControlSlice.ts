import { createSlice } from '@reduxjs/toolkit';
import { ZOOM_CONTROL_LEVEL } from 'src/configs/constants';

export const initialStateZoomControlSlice = {
  isInCloseZoomMode: ZOOM_CONTROL_LEVEL.FAR,
  frustum: null,
  cameraZoom: 1.5
} as IZoomControlSlice;

export const zoomControlSlice = createSlice({
  name: 'camera/zoomControlSlice@',
  initialState: initialStateZoomControlSlice,
  reducers: {
    resetToInitialStateZoomControlSlice(state) {
      state.isInCloseZoomMode = ZOOM_CONTROL_LEVEL.FAR;
      state.frustum = null;
      state.cameraZoom = 1.5
    },

    setInCloseZoomMode(state, action) {
      state.isInCloseZoomMode = action.payload.isInCloseZoomMode;
    },

    setFrustum(state, action) {
      state.frustum = action.payload.frustum;
    },

    setCameraZoom(state, action) {
      state.cameraZoom = action.payload.cameraZoom;
    }
  },
});

const { actions, reducer } = zoomControlSlice;
export const { resetToInitialStateZoomControlSlice,
  setInCloseZoomMode, setFrustum, setCameraZoom } = actions;
export default reducer;
