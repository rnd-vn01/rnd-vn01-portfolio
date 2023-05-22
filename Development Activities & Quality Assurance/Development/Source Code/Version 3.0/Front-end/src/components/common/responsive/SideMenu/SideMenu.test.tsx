import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SideMenu } from './SideMenu';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { Context as ResponsiveContext } from "react-responsive";
import { resetToInitialStateLanguageSlice, setStateAuth, setStateLanguage } from 'src/redux/slice';

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
    go: jest.fn(),
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { })
      }
    }
  }
}));

describe('Side menu', () => {
  it("to be rendered successfully", async () => {
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <SideMenu
            isShowing={false}
            callbackSetIsShowing={jest.fn()}
          />
        </Provider>
      </ResponsiveContext.Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "side-menu" })).toBeInTheDocument();
    })
  })

  it("should set suitable styling if is showing", async () => {
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <SideMenu
            isShowing={true}
            callbackSetIsShowing={jest.fn()}
          />
        </Provider>
      </ResponsiveContext.Provider>)

    const sideMenu = screen.getByRole("div", { name: "side-menu" })

    await waitFor(() => {
      expect(sideMenu).toBeInTheDocument();
      expect(sideMenu).toHaveClass("side-menu--showing")
    })
  })

  it("should update the language to EN if select from the collapsed select", async () => {
    jest.useFakeTimers();

    store.dispatch(setStateLanguage({
      currentLanguage: "VI"
    }))

    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <SideMenu
            isShowing={true}
            callbackSetIsShowing={jest.fn()}
          />
        </Provider>
      </ResponsiveContext.Provider>)

    await waitFor(() => {
      // Click on the option to un-collapse
      fireEvent.click(screen.getByTestId("side-menu-language"))
      // Click on English
      fireEvent.click(screen.getByTestId("side-menu-language__EN"))
    })

    jest.advanceTimersByTime(50);

    expect(store.getState().languageSlice.currentLanguage).toBe("EN")
    store.dispatch(resetToInitialStateLanguageSlice())
  })

  it("should update the language to VI if select from the collapsed select", async () => {
    jest.useFakeTimers();

    store.dispatch(setStateLanguage({
      currentLanguage: "EN"
    }))

    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <SideMenu
            isShowing={true}
            callbackSetIsShowing={jest.fn()}
          />
        </Provider>
      </ResponsiveContext.Provider>)

    await waitFor(() => {
      // Click on the option to un-collapse
      fireEvent.click(screen.getByTestId("side-menu-language"))
      // Click on English
      fireEvent.click(screen.getByTestId("side-menu-language__VI"))
    })

    jest.advanceTimersByTime(50);

    expect(store.getState().languageSlice.currentLanguage).toBe("VI")
    store.dispatch(resetToInitialStateLanguageSlice())
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
      item: 'auth_bar.menu.manual',
      path: '/manual'
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

      render(<ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <SideMenu
            isShowing={true}
            callbackSetIsShowing={jest.fn()}
          />
        </Provider>
      </ResponsiveContext.Provider>)

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
      item: 'auth_bar.menu.manual',
      path: '/manual'
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

      render(<ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <SideMenu
            isShowing={true}
            callbackSetIsShowing={jest.fn()}
          />
        </Provider>
      </ResponsiveContext.Provider>)

      await waitFor(() => {
        const menuItemDropdown = screen.getByRole("menu-item-dropdown", { name: `menu-item-dropdown-${item}` })
        fireEvent.click(menuItemDropdown);
        expect(mockHistoryPush).toHaveBeenCalledWith(path)
      })
    },
  );

  it("to log out the user and redirect to homepage if clicking on the logout", async () => {
    render(<ResponsiveContext.Provider value={{ width: 500 }}>
      <Provider store={store}>
        <SideMenu
          isShowing={true}
          callbackSetIsShowing={jest.fn()}
        />
      </Provider>
    </ResponsiveContext.Provider>)

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
      const menuItemDropdown = screen.getByRole("menu-item-dropdown", { name: "menu-item-dropdown-logout" })
      fireEvent.click(menuItemDropdown);
      expect(mockHistoryPush).toHaveBeenCalledWith("/", { "isRedirect": true })
      expect(store.getState().authSlice).toStrictEqual({
        isLoggedIn: false,
        user: {}
      })
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

    render(<ResponsiveContext.Provider value={{ width: 500 }}>
      <Provider store={store}>
        <SideMenu
          isShowing={true}
          callbackSetIsShowing={jest.fn()}
        />
      </Provider>
    </ResponsiveContext.Provider>)

    await waitFor(() => {
      const menuItemDropdown = screen.queryByText(`menu-item-dropdown-data_management`)
      expect(menuItemDropdown).toBeNull();
    })
  })
});
