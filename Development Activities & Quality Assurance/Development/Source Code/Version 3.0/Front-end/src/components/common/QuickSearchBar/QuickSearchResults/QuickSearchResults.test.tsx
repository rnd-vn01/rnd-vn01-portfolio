import { createEvent, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QuickSearchResults } from './QuickSearchResults';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { resetToInitialStateDataSlice, resetToInitialStateLanguageSlice, resetToInitialStatePointSelectionSlice, setAcupuncturePoints, setMeridians, setStateLanguage } from 'src/redux/slice';
import { mockGetItems } from 'src/api/mocks/items/mockGetItems';
import DEMO_DATA_EN from 'src/assets/test_data/acupoints_en.json';
import DEMO_DATA_MERIDIAN_EN from 'src/assets/test_data/meridians_en.json';

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
    location: {
      pathname: []
    }
  }),
  useLocation: () => ({
    pathname: '',
    search: ''
  })
}));

describe('QuickSearchResults', () => {
  beforeAll(() => {
    mockGetItems();
  })

  beforeEach(() => {
    store.dispatch(setStateLanguage({
      currentLanguage: "EN"
    }))
    store.dispatch(setAcupuncturePoints(DEMO_DATA_EN))
    store.dispatch(setMeridians(DEMO_DATA_MERIDIAN_EN))
  })

  afterEach(() => {
    store.dispatch(resetToInitialStatePointSelectionSlice())
    store.dispatch(resetToInitialStateDataSlice())
    store.dispatch(resetToInitialStateLanguageSlice())
  })

  it("to be rendered successfully", async () => {
    render(
      <Provider store={store}>
        <QuickSearchResults
          query={""}
          callbackIsReadyForSearch={jest.fn()}
        />
      </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quick-search-results" })).toBeInTheDocument();
    })
  })

  it("to have results listed out", async () => {
    render(
      <Provider store={store}>
        <QuickSearchResults
          query={"a"}
          isShowing={true}
          callbackIsReadyForSearch={jest.fn()}
        />
      </Provider>)

    await waitFor(() => {
      expect(screen.getAllByRole("div", { name: "quick-search-results-block" }).length).toBeGreaterThan(0);
    })
  })

  it("should stop propagation when clicked", async () => {
    render(
      <Provider store={store}>
        <QuickSearchResults
          query={"a"}
          callbackIsReadyForSearch={jest.fn()}
        />
      </Provider>)

    await waitFor(() => {
      const mockStopPropagation = jest.fn();

      const quickSearchResults = screen.getByRole("div", { name: "quick-search-results" })
      const clickEvent = createEvent.click(quickSearchResults);
      clickEvent.stopPropagation = mockStopPropagation;

      fireEvent(quickSearchResults, clickEvent)
      expect(mockStopPropagation).toHaveBeenCalled()
    })
  })

  it("should navigate to advanced search page if clicking on the box", async () => {
    render(
      <Provider store={store}>
        <QuickSearchResults
          query={"a"}
          callbackIsReadyForSearch={jest.fn()}
        />
      </Provider>)

    await waitFor(() => {
      const advancedSearchOption = screen.getByRole("div", { name: "quick-search-advanced-search" })
      fireEvent.click(advancedSearchOption)

      expect(mockHistoryPush).toHaveBeenCalledWith("/advanced-search?query=a")
    })
  })

  it("should load results if not loaded", async () => {
    store.dispatch(setAcupuncturePoints([]));
    store.dispatch(setMeridians([]));

    render(
      <Provider store={store}>
        <QuickSearchResults
          query={""}
          callbackIsReadyForSearch={jest.fn()}
        />
      </Provider>)
  })
});
