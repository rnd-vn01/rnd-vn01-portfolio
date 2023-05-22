import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QuickSearchBar } from './QuickSearchBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('QuickSearchBar', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <QuickSearchBar />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quick-search" })).toBeInTheDocument();
    })
  })

  it("should focus on the input box if click on the quick search bar", async () => {
    const quickSearchBar = screen.getByRole("div", { name: "quick-search" })
    fireEvent.click(quickSearchBar)

    await waitFor(() => {
      const quickSearchInput = screen.getByRole("input", { name: "quick-search-input" })
      const focusedElement = document.activeElement;
      expect(focusedElement).toBe(quickSearchInput)

      const quickSearchIcon = screen.getByRole("img", { name: "quick-search-icon" })
      let quickSearchIconURL = (quickSearchIcon as any).src.split("/")
      quickSearchIconURL = quickSearchIconURL[quickSearchIconURL.length - 1]
      expect(quickSearchIconURL).toBe("SearchIconBlack.svg")
    })
  })

  it("should change back to the original icon if blurred", async () => {
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
    const quickSearchInput = screen.getByRole("input", { name: "quick-search-input" })
    fireEvent.change(quickSearchInput, { target: { value: "aa" } })

    await waitFor(() => {
      expect(quickSearchInput.getAttribute("value")).toBe("aa")
    })
  })
});
