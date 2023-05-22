import { combineReducers } from '@reduxjs/toolkit';

import cameraQuaternionSlice from 'src/redux/slice/camera/cameraQuaternionSlice';
import authSlice from 'src/redux/slice/auth/authSlice';
import languageSlice from 'src/redux/slice/settings/languageSlice';
import selectionSlice from 'src/redux/slice/mouseControls/selectionSlice';
import globalSlice from 'src/redux/slice/global/globalSlice';
import quizSlice from 'src/redux/slice/quiz/quizSlice';
import zoomControlSlice from 'src/redux/slice/camera/zoomControlSlice';

export const rootReducer = combineReducers({
  cameraQuaternionSlice,
  authSlice,
  languageSlice,
  selectionSlice,
  globalSlice,
  quizSlice,
  zoomControlSlice
});
