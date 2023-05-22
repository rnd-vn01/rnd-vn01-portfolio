import { createSlice } from '@reduxjs/toolkit';

export const initialStateNavigationSlice = {
  quickSearchPersistQuery: '',
  backFromInformationBlock: false,
  viewDetailsLastPage: null,
  homeQueryPersistThroughNavigation: null
} as INavigationSlice;

export const navigationSlice = createSlice({
  name: 'navigation/navigationSlice@',
  initialState: initialStateNavigationSlice,
  reducers: {
    resetToInitialStateNavigationSlice(state) {
      state.quickSearchPersistQuery = '';
      state.backFromInformationBlock = false;
      state.viewDetailsLastPage = null;
      state.homeQueryPersistThroughNavigation = null;
    },

    resetToInitialStateQuickSearchBack(state) {
      state.quickSearchPersistQuery = '';
      state.backFromInformationBlock = false;
    },

    setQuickSearchPersistQuery(state, action) {
      state.quickSearchPersistQuery = action.payload;
    },

    setBackFromInformationBlock(state, action) {
      state.backFromInformationBlock = action.payload;
    },

    setViewDetailsPersistLastPage(state, action) {
      state.viewDetailsLastPage = action.payload;
    },

    setHomeQueryPersistThroughNavigation(state, action) {
      state.homeQueryPersistThroughNavigation = action.payload;
    }
  },
});

const { actions, reducer } = navigationSlice;
export const { resetToInitialStateNavigationSlice, setQuickSearchPersistQuery,
  resetToInitialStateQuickSearchBack, setBackFromInformationBlock,
  setViewDetailsPersistLastPage,
  setHomeQueryPersistThroughNavigation } = actions;
export default reducer;
