import { createEvent, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QuickSearchResults } from './QuickSearchResults';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { resetToInitialStatePointSelectionSlice } from 'src/redux/slice';

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
  afterEach(() => {
    store.dispatch(resetToInitialStatePointSelectionSlice())
  })

  it("to be rendered successfully", async () => {
    render(
      <Provider store={store}>
        <QuickSearchResults
          query={""}
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
        />
      </Provider>)

    await waitFor(() => {
      const advancedSearchOption = screen.getByRole("div", { name: "quick-search-advanced-search" })
      fireEvent.click(advancedSearchOption)

      expect(mockHistoryPush).toHaveBeenCalledWith("/advanced-search?query=a")
    })
  })

  it("should set the point as selected if the result is clicked", async () => {
    render(
      <Provider store={store}>
        <QuickSearchResults
          query={"M-HN-3"}
        />
      </Provider>)

    await waitFor(() => {
      const resultItems = screen.getAllByRole("quick-search-result-item")

      //Point M-HN-3
      fireEvent.click(resultItems[0])

      expect(store.getState().selectionSlice.selectedLabel).toBe("M-HN-3")
      expect(store.getState().selectionSlice.selectedType).toBe("point")
    })
  })
});
