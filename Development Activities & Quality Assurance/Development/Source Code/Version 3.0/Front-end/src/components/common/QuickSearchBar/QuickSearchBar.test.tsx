import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QuickSearchBar } from './QuickSearchBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { mockGetItems } from 'src/api/mocks/items/mockGetItems';
import { resetToInitialStateDataSlice, resetToInitialStateNavigationSlice, setBackFromInformationBlock, setHomeQueryPersistThroughNavigation, setQuickSearchPersistQuery } from 'src/redux/slice';

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: '',
      search: ''
    }
  }),
  useLocation: () => ({
    pathname: '',
    search: ''
  })
}));

describe('QuickSearchBar', () => {
  beforeAll(() => {
    mockGetItems();
  })

  afterEach(() => {
    store.dispatch(resetToInitialStateDataSlice())
    store.dispatch(resetToInitialStateNavigationSlice())
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <QuickSearchBar />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quick-search" })).toBeInTheDocument();
    })
  })

  it("should change back to the original icon if blurred", async () => {
    render(<Provider store={store}>
      <QuickSearchBar />
    </Provider>)

    const quickSearchBar = screen.getByRole("div", { name: "quick-search" })
    fireEvent.click(quickSearchBar)

    await waitFor(() => {
      const quickSearchInput = screen.getByRole("input", { name: "quick-search-input" })
      fireEvent.blur(quickSearchInput)

      const quickSearchIcon = screen.getByRole("img", { name: "quick-search-icon" })
      let quickSearchIconURL = (quickSearchIcon as any).src.split("/")
      quickSearchIconURL = quickSearchIconURL[quickSearchIconURL.length - 1]
      expect(quickSearchIconURL).toBe("SearchIconGray.svg")
    })
  })

  it("should update the value if type in the input box", async () => {
    render(<Provider store={store}>
      <QuickSearchBar />
    </Provider>)

    const quickSearchInput = screen.getByRole("input", { name: "quick-search-input" })
    fireEvent.change(quickSearchInput, { target: { value: "aa" } })

    await waitFor(() => {
      expect(quickSearchInput.getAttribute("value")).toBe("aa")
    })
  })

  it("should update the query if stored and passed from information block", async () => {
    jest.useFakeTimers();

    store.dispatch(setQuickSearchPersistQuery("abc"))
    store.dispatch(setHomeQueryPersistThroughNavigation("abc"));
    store.dispatch(setBackFromInformationBlock(true))

    render(<Provider store={store}>
      <QuickSearchBar />
    </Provider>)

    jest.advanceTimersByTime(100)

    await waitFor(() => {
      const quickSearchInput = screen.getByRole("input", { name: "quick-search-input" })
      expect(quickSearchInput.getAttribute("value")).toBe("abc")
    })
  })

  it("should search with same query if clicked on the search input", async () => {
    render(<Provider store={store}>
      <QuickSearchBar />
    </Provider>)

    await waitFor(() => {
      const quickSearchInput = screen.getByRole("input", { name: "quick-search-input" })
      fireEvent.change(quickSearchInput, { target: { value: "aa" } })
      fireEvent.click(quickSearchInput)
    })
  })
});
