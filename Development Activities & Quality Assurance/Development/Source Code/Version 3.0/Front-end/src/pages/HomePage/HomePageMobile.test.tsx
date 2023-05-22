import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HomePage } from './HomePage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import {
  resetToInitialStateGlobalSlice,
  resetToInitialStatePointSelectionSlice,
} from 'src/redux/slice';
import { Context as ResponsiveContext } from "react-responsive";
import { mockGetItems } from 'src/api/mocks/items/mockGetItems';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "TEST_PATH",
    state: {
      isRedirect: true
    }
  })
}));

describe('Home page - Mobile viewport', () => {
  beforeAll(() => {
    mockGetItems();
  })

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  })

  afterEach(() => {
    store.dispatch(resetToInitialStateGlobalSlice())
    store.dispatch(resetToInitialStatePointSelectionSlice())
  })

  beforeEach(() => {
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </ResponsiveContext.Provider>
    )
  })

  it("should include the menu bar and side menu", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "menu-bar" })).toBeInTheDocument();
      expect(screen.getByRole("div", { name: "side-menu" })).toBeInTheDocument();
    })
  })

  it("should open the search bar if selected", async () => {
    await waitFor(async () => {
      fireEvent.click(screen.getByRole("menu-button", { name: "search-bar" }))
    })

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "home-page-search-bar" })).toBeInTheDocument();
    })
  })
});
