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
      search: '?type=point&code=LU-1'
    }
  }),
  useLocation: () => ({
    pathname: '',
    search: '?type=point&code=LU-1'
  })
}));

describe('QuickSearchBar with type', () => {
  beforeAll(() => {
    mockGetItems();
  })

  afterEach(() => {
    store.dispatch(resetToInitialStateDataSlice())
    store.dispatch(resetToInitialStateNavigationSlice())
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
});
