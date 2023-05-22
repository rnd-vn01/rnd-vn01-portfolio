import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SearchBarRedirect } from './SearchBarRedirect';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

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

describe('SearchBarRedirect', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <SearchBarRedirect
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-bar-redirect" })).toBeInTheDocument();
    })
  })

  it("should focus on the input box if click on the quick search bar", async () => {
    const searchBar = screen.getByRole("div", { name: "search-bar-redirect" })
    fireEvent.click(searchBar)

    await waitFor(() => {
      const searchInput = screen.getByRole("input", { name: "search-input" })
      const focusedElement = document.activeElement;
      expect(focusedElement).toBe(searchInput)

      const searchBarIcon = screen.getByRole("img", { name: "search-bar-icon" })
      let searchBarIconURL = (searchBarIcon as any).src.split("/")
      searchBarIconURL = searchBarIconURL[searchBarIconURL.length - 1]
      expect(searchBarIconURL).toBe("SearchIconBlack.svg")
    })
  })

  it("should change back to the original icon if blurred", async () => {
    const searchBar = screen.getByRole("div", { name: "search-bar-redirect" })
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

  it("should redirect to advanced search with same query if type in query", async () => {
    const searchInput = screen.getByRole("input", { name: "search-input" })
    fireEvent.change(searchInput, { target: { value: "aa" } })

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/advanced-search?query=aa", {
        fromDetailPage: true
      })
    })
  })
});
