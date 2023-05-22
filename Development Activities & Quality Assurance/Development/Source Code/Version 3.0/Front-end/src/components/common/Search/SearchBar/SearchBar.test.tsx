import { createEvent, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { mockGetItems } from 'src/api/mocks/items/mockGetItems';

const mockCallbackIsFilter = jest.fn();

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: []
    },
    go: jest.fn()
  }),
  useLocation: () => ({
    pathname: '',
    search: ''
  })
}));

describe('SearchBar', () => {
  beforeAll(() => {
    mockGetItems();
  })

  beforeEach(() => {
    render(<Provider store={store}>
      <SearchBar
        callbackSetResults={jest.fn()}
        callbackSetLoading={jest.fn()}
        callbackSetQuery={jest.fn()}
        callbackIsFilter={mockCallbackIsFilter}
        numberOfMatchingResults={5}
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-bar" })).toBeInTheDocument();
    })
  })

  it("should change back to the original icon if blurred", async () => {
    const searchBar = screen.getByRole("div", { name: "search-bar" })
    fireEvent.click(searchBar)

    await waitFor(() => {
      const searchInput = screen.getByRole("input", { name: "search-input" })
      fireEvent.blur(searchInput)

      const searchBarIcon = screen.getByRole("img", { name: "search-bar-icon" })
      let searchBarIconURL = (searchBarIcon as any).src.split("/")
      searchBarIconURL = searchBarIconURL[searchBarIconURL.length - 1]
      expect(searchBarIconURL).toBe("SearchIconGray.svg")
    })
  })

  it("should update the value if type in the input box", async () => {
    const searchInput = screen.getByRole("input", { name: "search-input" })
    fireEvent.change(searchInput, { target: { value: "aa" } })

    await waitFor(() => {
      expect(searchInput.getAttribute("value")).toBe("aa")
    })
  })

  it("should callback to show filter box if clicked on the filter icon", async () => {
    const filterIcon = screen.getByRole("img", { name: "filter-icon" })
    fireEvent.click(filterIcon)

    await waitFor(() => {
      let filterIconURL = (filterIcon as any).src.split("/")
      filterIconURL = filterIconURL[filterIconURL.length - 1]
      expect(filterIconURL).toBe("IconFilterOn.svg")
      expect(mockCallbackIsFilter).toHaveBeenCalledWith(true)
    })
  })

  it("should hide the filter box after showed if clicked on the filter icon", async () => {
    const filterIcon = screen.getByRole("img", { name: "filter-icon" })
    fireEvent.click(filterIcon)
    fireEvent.click(filterIcon)

    await waitFor(() => {
      let filterIconURL = (filterIcon as any).src.split("/")
      filterIconURL = filterIconURL[filterIconURL.length - 1]
      expect(filterIconURL).toBe("IconFilterOff.svg")
      expect(mockCallbackIsFilter).toHaveBeenLastCalledWith(false)
    })
  })
});
