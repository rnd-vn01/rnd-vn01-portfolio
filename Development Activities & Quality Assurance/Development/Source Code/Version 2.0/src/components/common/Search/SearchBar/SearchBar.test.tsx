import { createEvent, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('SearchBar', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <SearchBar
        callbackSetResults={jest.fn()}
        callbackSetLoading={jest.fn()}
        callbackSetQuery={jest.fn()}
        numberOfMatchingResults={5}
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-bar" })).toBeInTheDocument();
    })
  })

  it("should focus on the input box if click on the quick search bar", async () => {
    const searchBar = screen.getByRole("div", { name: "search-bar" })
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

  it("should reset the query as null if clicked on the input box", async () => {
    const searchInput = screen.getByRole("input", { name: "search-input" })
    fireEvent.change(searchInput, { target: { value: "aa" } })
    fireEvent.click(searchInput)

    await waitFor(() => {
      expect(searchInput.getAttribute("value")).toBe("")
    })
  })
});
