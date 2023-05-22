import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HomePage } from './HomePage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import {
  resetToInitialStateGlobalSlice,
  resetToInitialStatePointSelectionSlice,
  setModelLoaded,
  setPointSelectedByLabel,
  setShowingQuickInformation
} from 'src/redux/slice';
import { mockGetItems } from 'src/api/mocks/items/mockGetItems';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "TEST_PATH",
    state: {},
    search: ''
  })
}));

describe('HomePage default entry', () => {
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

  it("should close the landing page if model loaded and clicked on the landing page", async () => {
    store.dispatch(setModelLoaded({
      modelLoaded: true
    }))

    render(<Provider store={store}>
      <HomePage />
    </Provider>)

    const landingPage = screen.getByRole("div", { name: "home-page-landing" })
    fireEvent.click(landingPage)

    await waitFor(() => {
      expect(landingPage).toHaveClass("home-page__landing--hidden")
    })
  })

  it("should not close the landing page if model if not loaded successfully and clicked on the landing page", async () => {
    store.dispatch(setModelLoaded({
      modelLoaded: false
    }))

    render(<Provider store={store}>
      <HomePage />
    </Provider>)

    const landingPage = screen.getByRole("div", { name: "home-page-landing" })
    fireEvent.click(landingPage)

    await waitFor(() => {
      expect(landingPage).not.toHaveClass("home-page__landing--hidden")
    })
  })

  it("should show information block if is showing quick information", async () => {
    render(<Provider store={store}>
      <HomePage />
    </Provider>)

    store.dispatch(setShowingQuickInformation({
      quickInformation: {
        type: "point",
        content: "LU-20"
      }
    }))

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "home-page-information" })).toBeInTheDocument()
    })
  })

  it("should close the landing page if model loaded and not clicked on the landing page after 2 seconds", async () => {
    jest.useFakeTimers();

    store.dispatch(setModelLoaded({
      modelLoaded: true
    }))

    render(<Provider store={store}>
      <HomePage />
    </Provider>)

    const landingPage = screen.getByRole("div", { name: "home-page-landing" })

    jest.advanceTimersByTime(3000)

    await waitFor(() => {
      expect(landingPage).toHaveClass("home-page__landing--hidden")
    })
  })

  it("should close the landing page if model not loaded after 5 seconds", async () => {
    jest.useFakeTimers();

    store.dispatch(setModelLoaded({
      modelLoaded: false
    }))

    render(<Provider store={store}>
      <HomePage />
    </Provider>)

    jest.advanceTimersByTime(5000)

    const landingPage = screen.getByRole("div", { name: "home-page-landing" })

    await waitFor(() => {
      expect(landingPage).toHaveClass("home-page__landing--hidden")
    })
  })

  it("should reset selected item if page is render with another point selected", async () => {
    store.dispatch(setPointSelectedByLabel({
      selectedPoint: "BL-3"
    }))

    jest.useFakeTimers();
    render(<Provider store={store}>
      <HomePage />
    </Provider>)

    jest.advanceTimersByTime(500)

    await waitFor(() => {
      expect(store.getState().selectionSlice.selectedLabel).toBeNull();
    })
  })
});
