
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthBar } from './AuthBar';
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

describe('AuthBar', () => {
  afterEach(() => {
    store.dispatch(resetToInitialStateAuthSlice());
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <AuthBar />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "auth-bar" })).toBeInTheDocument();
    })
  })

  it("to log out the user and redirect to homepage if clicking on the logout", async () => {
    render(<Provider store={store}>
      <AuthBar />
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
      const menuItemDropdown = screen.getByRole("menu-item-dropdown", { name: "menu-item-dropdown-auth_bar.menu.log_out" })
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
      item: 'auth_bar.menu.data_management',
      path: '/data'
    },
    {
      item: 'auth_bar.menu.advanced_search',
      path: '/advanced-search'
    },
    {
      item: 'auth_bar.menu.start_quiz',
      path: '/quiz'
    },
    {
      item: 'auth_bar.menu.personal_records',
      path: '/records'
    },
    {
      item: 'auth_bar.menu.about_us',
      path: '/about'
    },
    {
      item: 'auth_bar.menu.edit_profile',
      path: '/edit-profile'
    },
  ])(
    'to naviage to $item page if clicking on the item',
    async ({ item, path }) => {
      //Set admin user
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
        <AuthBar />
      </Provider>)

      await waitFor(() => {
        const menuItemDropdown = screen.getByRole("menu-item-dropdown", { name: `menu-item-dropdown-${item}` })
        fireEvent.click(menuItemDropdown);
        expect(mockHistoryPush).toHaveBeenCalledWith(path)
      })
    },
  );

  test.each([
    {
      item: 'auth_bar.sign_up',
      path: '/signup'
    },
    {
      item: 'auth_bar.log_in',
      path: '/login'
    },
    {
      item: 'auth_bar.menu.advanced_search',
      path: '/advanced-search'
    },
    {
      item: 'auth_bar.menu.about_us',
      path: '/about'
    }
  ])(
    'to naviage to $item page if clicking on the item for not logged in users',
    async ({ item, path }) => {
      store.dispatch(setStateAuth({
        isLoggedIn: false,
        user: {}
      }));

      render(<Provider store={store}>
        <AuthBar />
      </Provider>)

      await waitFor(() => {
        const menuItemDropdown = screen.getByRole("menu-item-dropdown", { name: `menu-item-dropdown-${item}` })
        fireEvent.click(menuItemDropdown);
        expect(mockHistoryPush).toHaveBeenCalledWith(path)
      })
    },
  );

  it("should show the menu content when clicking on the logo", async () => {
    render(<Provider store={store}>
      <AuthBar />
    </Provider>)

    store.dispatch(setStateAuth({
      isLoggedIn: false,
      user: {}
    }));

    const menuLogo = screen.getByRole("menu-button", { name: "auth-bar-menu-button" })
    fireEvent.click(menuLogo);

    await waitFor(() => {
      const divDropdown = screen.getByRole("div", { name: "auth-bar-dropdown" })
      expect(divDropdown).not.toHaveClass("auth-bar__dropdown--hide")
    })
  })

  it("should hide the menu content when clicking on the logo and the menu is in collapsed mode", async () => {
    render(<Provider store={store}>
      <AuthBar />
    </Provider>)

    store.dispatch(setStateAuth({
      isLoggedIn: false,
      user: {}
    }));

    const menuLogo = screen.getByRole("menu-button", { name: "auth-bar-menu-button" })
    fireEvent.click(menuLogo);
    fireEvent.click(menuLogo);

    await waitFor(() => {
      const divDropdown = screen.getByRole("div", { name: "auth-bar-dropdown" })
      expect(divDropdown).toHaveClass("auth-bar__dropdown--hide")
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
      <AuthBar />
    </Provider>)

    await waitFor(() => {
      const menuItemDropdown = screen.queryByText(`menu-item-dropdown-data_management`)
      expect(menuItemDropdown).toBeNull();
    })
  })
});
