import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MenuBar } from './MenuBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { Context as ResponsiveContext } from "react-responsive";
import { resetToInitialStateAuthSlice, setStateAuth } from 'src/redux/slice';

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

describe('Menu bar - Mobile', () => {
  const mockCallBackIsShowingSideMenu = jest.fn();

  beforeEach(() => {

  })

  afterEach(() => {
    store.dispatch(resetToInitialStateAuthSlice())
  })

  it("to be rendered successfully", async () => {
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <MenuBar
            isShowingSideMenu={false}
            isShowingSearchBar={false}
            callbackSetIsShowingSearchBar={jest.fn()}
            callbackSetIsShowingSideMenu={mockCallBackIsShowingSideMenu}
          />
        </Provider>
      </ResponsiveContext.Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "menu-bar" })).toBeInTheDocument();
    })
  })

  it("should hide the menu if clicked on the show menu icon", async () => {
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <MenuBar
            isShowingSideMenu={false}
            isShowingSearchBar={false}
            callbackSetIsShowingSearchBar={jest.fn()}
            callbackSetIsShowingSideMenu={mockCallBackIsShowingSideMenu}
          />
        </Provider>
      </ResponsiveContext.Provider>)

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("show-menu-icon"))
    })

    expect(mockCallBackIsShowingSideMenu).toHaveBeenCalledWith(false)
  })

  it("should show the side menu if clicked on the icon", async () => {
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <MenuBar
            isShowingSideMenu={false}
            isShowingSearchBar={false}
            callbackSetIsShowingSearchBar={jest.fn()}
            callbackSetIsShowingSideMenu={mockCallBackIsShowingSideMenu}
          />
        </Provider>
      </ResponsiveContext.Provider>)

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("show-sidemenu-icon"))
    })

    expect(mockCallBackIsShowingSideMenu).toHaveBeenCalledWith(true)
  })

  it("should hide unused box control if is showing side menu", async () => {
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <MenuBar
            isShowingSideMenu={true}
            isShowingSearchBar={false}
            callbackSetIsShowingSearchBar={jest.fn()}
            callbackSetIsShowingSideMenu={mockCallBackIsShowingSideMenu}
          />
        </Provider>
      </ResponsiveContext.Provider>)

    await waitFor(() => {
      expect(screen.getByTestId("show-menu-icon")).toHaveClass("menu-bar__item--no-wrap")
      expect(screen.getByTestId("meridian-control")).toHaveClass("menu-bar__item--no-wrap")
      expect(screen.getByTestId("search-bar")).toHaveClass("menu-bar__item--no-wrap")
    })
  })

  it("should set the icon of user as hamburger if not logged in", async () => {
    store.dispatch(setStateAuth({
      isLoggedIn: false,
      user: {}
    }));

    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <MenuBar
            isShowingSideMenu={false}
            isShowingSearchBar={false}
            callbackSetIsShowingSearchBar={jest.fn()}
            callbackSetIsShowingSideMenu={mockCallBackIsShowingSideMenu}
          />
        </Provider>
      </ResponsiveContext.Provider>)

    await waitFor(() => {
      expect(screen.getByTestId("hamburger-icon")).toBeInTheDocument();
    })
  })

  it("should set the user icon with king icon if is admin", async () => {
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

    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <MenuBar
            isShowingSideMenu={false}
            isShowingSearchBar={false}
            callbackSetIsShowingSearchBar={jest.fn()}
            callbackSetIsShowingSideMenu={mockCallBackIsShowingSideMenu}
          />
        </Provider>
      </ResponsiveContext.Provider>)

    await waitFor(() => {
      expect(screen.getByTestId("admin-icon")).toBeInTheDocument();
    })
  })
});
