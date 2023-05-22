import { createSlice } from '@reduxjs/toolkit';

export const initialStateLanguageSlice = {
  currentLanguage: "EN"
} as ILanguageSlice;

export const LANGUAGES_LIST = ["EN", "VI"]

export const languageSlice = createSlice({
  name: 'settings/languageSlice@',
  initialState: initialStateLanguageSlice,
  reducers: {
    resetToInitialStateLanguageSlice(state) {
      state.currentLanguage = "EN";
    },

    setStateLanguage(state, action) {
      state.currentLanguage = action.payload.currentLanguage;
    }
  },
});

const { actions, reducer } = languageSlice;
export const { resetToInitialStateLanguageSlice, setStateLanguage } = actions;
export default reducer;
