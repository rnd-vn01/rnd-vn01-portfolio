import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AdvancedSearchPage } from './AdvancedSearchPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { Context as ResponsiveContext } from "react-responsive";
import { mockGetItems } from 'src/api/mocks/items/mockGetItems';

const spyScrollTo = jest.fn();
Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: '/advanced_search',
    search: ''
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Advanced Search page - Desktop', () => {
  beforeEach(() => {
    mockGetItems();
    spyScrollTo.mockClear();
    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <AdvancedSearchPage />
      </Provider>
    </ResponsiveContext.Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "advanced-search-page" })).toBeInTheDocument();
    })
  })

  it("should show the scroll to top icon if scroll out of 100px from the top", async () => {
    window.pageYOffset = 120
    fireEvent.scroll(document, { target: { scrollY: 120 } })

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "scroll-to-top" })).toHaveClass("advanced-search-page__scroll-to-top--showing")
    })
  })

  it("should hide the scroll to top icon if scroll inside range of 100px from the top", async () => {
    window.pageYOffset = 80
    fireEvent.scroll(document, { target: { scrollY: 80 } })

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "scroll-to-top" })).not.toHaveClass("advanced-search-page__scroll-to-top--showing")
    })
  })

  it("should scroll to top if clicked on the icon", async () => {
    window.pageYOffset = 120
    fireEvent.scroll(document, { target: { scrollY: 120 } })

    await waitFor(() => {
      fireEvent.click(screen.getByRole("div", { name: "scroll-to-top" }))
      expect(spyScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      })
    })
  })
});

describe('Advanced Search page - Mobile', () => {
  beforeEach(() => {
    mockGetItems();
    spyScrollTo.mockClear();
    render(<ResponsiveContext.Provider value={{ width: 500 }}>
      <Provider store={store}>
        <AdvancedSearchPage />
      </Provider>
    </ResponsiveContext.Provider>)
  })

  it("to include the mobile title bar", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "mobile-title-bar" })).toBeInTheDocument();
      expect(screen.getByRole("div", { name: "side-menu" })).toBeInTheDocument();
    })
  })
});
