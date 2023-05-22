import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FullPageTitleBar } from './FullPageTitleBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { resetToInitialStateAuthSlice, resetToInitialStateLanguageSlice, setStateAuth, setStateLanguage } from 'src/redux/slice';
import { DEFAULT_PROFILE_IMAGE_URL } from 'src/configs/constants';

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
  beforeEach(() => {
    store.dispatch(setStateLanguage({
      currentLanguage: "EN"
    }))
  })

  afterEach(() => {
    store.dispatch(resetToInitialStateAuthSlice());
    store.dispatch(resetToInitialStateLanguageSlice())
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <FullPageTitleBar
        translateCode='about_us'
      />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "title-bar" })).toBeInTheDocument();
    })
  })

  it("to log out the user and redirect to homepage if clicking on the logout", async () => {
    render(<Provider store={store}>
      <FullPageTitleBar
        translateCode='about_us'
      />
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
        <FullPageTitleBar
          translateCode='about_us'
        />
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

      render(<Provider store={store}>
        <FullPageTitleBar
          translateCode='about_us'
        />
      </Provider>)

      await waitFor(() => {
        const menuItemDropdown = screen.getByRole("menu-item-dropdown", { name: `menu-item-dropdown-${item}` })
        fireEvent.click(menuItemDropdown);
        expect(mockHistoryPush).toHaveBeenCalledWith(path)
      })
    },
  );

  it("should redirect to home page if clicking on the Home option, logged in", async () => {
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
        translateCode='about_us'
      />
    </Provider>)

    await waitFor(() => {
      const menuItemDropdown = screen.getByRole("menu-item-dropdown", { name: "menu-item-dropdown-auth_bar.menu.home" })
      fireEvent.click(menuItemDropdown);
      expect(mockHistoryPush).toHaveBeenCalledWith("/", { "isRedirect": true })
    })
  })

  it("should redirect to home page if clicking on the Home option, not logged in", async () => {
    render(<Provider store={store}>
      <FullPageTitleBar
        translateCode='about_us'
      />
    </Provider>)

    store.dispatch(setStateAuth({
      isLoggedIn: false,
      user: {}
    }));

    await waitFor(() => {
      const menuItemDropdown = screen.getByRole("menu-item-dropdown", { name: "menu-item-dropdown-auth_bar.menu.home" })
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

    render(<Provider store={store}>
      <FullPageTitleBar
        translateCode='about_us'
      />
    </Provider>)

    await waitFor(() => {
      const menuItemDropdown = screen.queryByText(`menu-item-title_bar.menu.data_management`)
      expect(menuItemDropdown).toBeNull();
    })
  })

  it("should show the menu content when clicking on the logo", async () => {
    render(<Provider store={store}>
      <FullPageTitleBar
        translateCode='about_us'
      />
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
      <FullPageTitleBar
        translateCode='about_us'
      />
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

  it("should add color background for corresponding word in page title", async () => {
    render(<Provider store={store}>
      <FullPageTitleBar
        translateCode="about us"
      />
    </Provider>)

    await waitFor(() => {
      // Get the first word
      const firstWordTitle = screen.getByRole("h1", { name: "word-0" })
      const secondWordTitle = screen.getByRole("h1", { name: "word-1" })

      expect(secondWordTitle).toHaveClass("title-bar__page-title--bg")
      expect(firstWordTitle).not.toHaveClass("title-bar__page-title--bg")
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
      const menuItemCurrentPage = screen.getByRole("menu-item-dropdown", { name: "menu-item-dropdown-auth_bar.menu.personal_records" })

      // Get the menu item of another page
      const menuItemOtherPage = screen.getByRole("menu-item-dropdown", { name: "menu-item-dropdown-auth_bar.menu.data_management" })

      expect(menuItemCurrentPage).toHaveClass("title-bar__dropdown--selected-item")
      expect(menuItemOtherPage).not.toHaveClass("title-bar__dropdown--selected-item")
    })
  })

  it("should highlight selected page, not logged in", async () => {
    store.dispatch(setStateAuth({
      isLoggedIn: false,
      user: {}
    }));

    render(<Provider store={store}>
      <FullPageTitleBar
        translateCode="advanced_search"
      />
    </Provider>)

    await waitFor(() => {
      // Get the menu item of current page
      const menuItemCurrentPage = screen.getByRole("menu-item-dropdown", { name: "menu-item-dropdown-auth_bar.menu.advanced_search" })

      // Get the menu item of another page
      const menuItemOtherPage = screen.getByRole("menu-item-dropdown", { name: "menu-item-dropdown-auth_bar.menu.home" })

      expect(menuItemCurrentPage).toHaveClass("title-bar__dropdown--selected-item")
      expect(menuItemOtherPage).not.toHaveClass("title-bar__dropdown--selected-item")
    })
  })

  it("should use the default image if no profile image is found", async () => {
    store.dispatch(setStateAuth({
      isLoggedIn: true,
      user: {
        name: "NAME",
        email: "test@gmail.com",
        profileImage: undefined,
        firebaseId: "firebaseId",
        isAdmin: true
      }
    }));

    render(<Provider store={store}>
      <FullPageTitleBar
        translateCode="advanced_search"
      />
    </Provider>)

    await waitFor(() => {
      const profileImage = screen.getByTestId("title-bar-profile-image");
      expect((profileImage as any).src).toBe(DEFAULT_PROFILE_IMAGE_URL)
    })
  })
});

describe('FullPageTitleBar Vietnamese language', () => {
  beforeEach(() => {
    store.dispatch(setStateLanguage({
      currentLanguage: "VI"
    }))
  })

  afterEach(() => {
    store.dispatch(resetToInitialStateAuthSlice());
    store.dispatch(resetToInitialStateLanguageSlice())
  })

  it("cover the case second highlighted words next to the first", async () => {
    store.dispatch(setStateAuth({
      isLoggedIn: false,
      user: {}
    }));

    render(<Provider store={store}>
      <FullPageTitleBar
        translateCode="long long title"
      />
    </Provider>)
  })

  it("cover the case using default title bar", async () => {
    store.dispatch(setStateAuth({
      isLoggedIn: false,
      user: {}
    }));

    render(<Provider store={store}>
      <FullPageTitleBar
      />
    </Provider>)
  })
});
