import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FullPageTitleBar } from './FullPageTitleBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { resetToInitialStateAuthSlice, setStateAuth } from 'src/redux/slice';

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

describe('FullPageTitleBar', () => {
  afterEach(() => {
    store.dispatch(resetToInitialStateAuthSlice());
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <FullPageTitleBar />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "title-bar" })).toBeInTheDocument();
    })
  })

  it("to log out the user and redirect to homepage if clicking on the logout", async () => {
    render(<Provider store={store}>
      <FullPageTitleBar />
    </Provider>)

    store.dispatch(setStateAuth({
      isLoggedIn: true,
      user: {
        name: "NAME",
        email: "test@gmail.com",
        profileImage: "profileImage",
        firebaseId: "firebaseId",
        isAdmin: true
      }
    }));

    await waitFor(() => {
      const menuItemDropdown = screen.getByRole("menu-item", { name: "menu-item-title_bar.menu.log_out" })
      fireEvent.click(menuItemDropdown);
      expect(mockHistoryPush).toHaveBeenCalledWith("/", { "isRedirect": true })
      expect(store.getState().authSlice).toStrictEqual({
        isLoggedIn: false,
        user: {}
      })
    })
  })

  test.each([
    {
      item: 'title_bar.menu.personal_records',
      path: '/records'
    },
    {
      item: 'title_bar.menu.data_management',
      path: '/data'
    },
    {
      item: 'auth_bar.menu.edit_profile',
      path: '/edit-profile'
    },
  ])(
    'to naviage to $item page if clicking on the item for logged in users',
    async ({ item, path }) => {
      store.dispatch(setStateAuth({
        isLoggedIn: true,
        user: {
          name: "NAME",
          email: "test@gmail.com",
          profileImage: "profileImage",
          firebaseId: "firebaseId",
          isAdmin: true
        }
      }));

      render(<Provider store={store}>
        <FullPageTitleBar />
      </Provider>)

      await waitFor(() => {
        const menuItemDropdown = screen.getByRole("menu-item", { name: `menu-item-${item}` })
        fireEvent.click(menuItemDropdown);
        expect(mockHistoryPush).toHaveBeenCalledWith(path)
      })
    },
  );

  test.each([
    {
      item: 'title_bar.menu.sign_up',
      path: '/signup'
    },
    {
      item: 'title_bar.menu.log_in',
      path: '/login'
    },
  ])(
    'to naviage to $item page if clicking on the item for not logged in users',
    async ({ item, path }) => {
      store.dispatch(setStateAuth({
        isLoggedIn: false,
        user: {}
      }));

      render(<Provider store={store}>
        <FullPageTitleBar />
      </Provider>)

      await waitFor(() => {
        const menuItemDropdown = screen.getByRole("menu-item", { name: `menu-item-${item}` })
        fireEvent.click(menuItemDropdown);
        expect(mockHistoryPush).toHaveBeenCalledWith(path)
      })
    },
  );

  it("should redirect to home page if clicking on home icon", async () => {
    render(<Provider store={store}>
      <FullPageTitleBar />
    </Provider>)

    await waitFor(() => {
      const homeIcon = screen.getByRole("div", { name: "title-bar-home-icon" })
      fireEvent.click(homeIcon);
      expect(mockHistoryPush).toHaveBeenCalledWith("/", { "isRedirect": true })
    })
  })

  it("should hide not selectable items", async () => {
    //Set admin user
    store.dispatch(setStateAuth({
      isLoggedIn: true,
      user: {
        name: "NAME",
        email: "test@gmail.com",
        profileImage: "profileImage",
        firebaseId: "firebaseId",
        isAdmin: false
      }
    }));

    render(<Provider store={store}>
      <FullPageTitleBar />
    </Provider>)

    await waitFor(() => {
      const menuItemDropdown = screen.queryByText(`menu-item-title_bar.menu.data_management`)
      expect(menuItemDropdown).toBeNull();
    })
  })

  it("should show the menu content when clicking on the logo", async () => {
    render(<Provider store={store}>
      <FullPageTitleBar />
    </Provider>)

    store.dispatch(setStateAuth({
      isLoggedIn: false,
      user: {}
    }));

    const menuLogo = screen.getByRole("div", { name: "title-bar-logo" })
    fireEvent.click(menuLogo);

    await waitFor(() => {
      const divDropdown = screen.getByRole("div", { name: "title-bar-dropdown" })
      expect(divDropdown).not.toHaveClass("title-bar__dropdown--hide")
    })
  })

  it("should hide the menu content when clicking on the logo and the menu is in collapsed mode", async () => {
    render(<Provider store={store}>
      <FullPageTitleBar />
    </Provider>)

    store.dispatch(setStateAuth({
      isLoggedIn: false,
      user: {}
    }));

    const menuLogo = screen.getByRole("div", { name: "title-bar-logo" })
    fireEvent.click(menuLogo);
    fireEvent.click(menuLogo);

    await waitFor(() => {
      const divDropdown = screen.getByRole("div", { name: "title-bar-dropdown" })
      expect(divDropdown).toHaveClass("title-bar__dropdown--hide")
    })
  })

  it("should add color background for first word in page title", async () => {
    render(<Provider store={store}>
      <FullPageTitleBar
        translateCode="about us"
      />
    </Provider>)

    await waitFor(() => {
      // Get the first word
      const firstWordTitle = screen.getByRole("h1", { name: "word-0" })
      const secondWordTitle = screen.getByRole("h1", { name: "word-1" })

      expect(firstWordTitle).toHaveClass("title-bar__page-title--bg")
      expect(secondWordTitle).not.toHaveClass("title-bar__page-title--bg")
    })
  })

  it("should highlight selected page", async () => {
    store.dispatch(setStateAuth({
      isLoggedIn: true,
      user: {
        name: "NAME",
        email: "test@gmail.com",
        profileImage: "profileImage",
        firebaseId: "firebaseId",
        isAdmin: true
      }
    }));

    render(<Provider store={store}>
      <FullPageTitleBar
        translateCode="personal_records"
      />
    </Provider>)

    await waitFor(() => {
      // Get the menu item of current page
      const menuItemCurrentPage = screen.getByRole("menu-item", { name: "menu-item-title_bar.menu.personal_records" })

      // Get the menu item of another page
      const menuItemOtherPage = screen.getByRole("menu-item", { name: "menu-item-title_bar.menu.data_management" })

      expect(menuItemCurrentPage).toHaveClass("title-bar__dropdown--selected-item")
      expect(menuItemOtherPage).not.toHaveClass("title-bar__dropdown--selected-item")
    })
  })
});
