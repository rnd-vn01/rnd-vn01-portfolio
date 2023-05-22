import { createSlice } from '@reduxjs/toolkit';

export const initialStateAuthSlice = {
  isLoggedIn: false,
  user: {}
} as IAuthSlice;

export const authSlice = createSlice({
  name: 'auth/authSlice@',
  initialState: initialStateAuthSlice,
  reducers: {
    resetToInitialStateAuthSlice(state) {
      state.isLoggedIn = false;
      state.user = {};
    },

    setStateAuth(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    }
  },
});

const { actions, reducer } = authSlice;
export const { resetToInitialStateAuthSlice, setStateAuth } = actions;
export default reducer;
