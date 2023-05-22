import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MobileTitleBar } from './MobileTitleBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { Context as ResponsiveContext } from "react-responsive";

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

describe('Mobile title bar - Basic', () => {
  const mockCallBackIsShowingSideMenu = jest.fn();

  beforeEach(() => {
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <MobileTitleBar
            translateCode={"about us"}
            isShowingSideMenu={false}
            callbackSetIsShowingSideMenu={mockCallBackIsShowingSideMenu}
            isViewingDetail={false}
            isQuiz={false}
            isEdit={false}
          />
        </Provider>
      </ResponsiveContext.Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "mobile-title-bar" })).toBeInTheDocument();
    })
  })

  it("should navigate to the home page if clicked on the home icon", async () => {
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("home-icon"))
    })

    expect(mockHistoryPush).toHaveBeenCalledWith("/", { isRedirect: true })
  })

  it("should show the menu if clicked on the hamburger bar and menu is not showing", async () => {
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("hamburger-icon"))
    })

    expect(mockCallBackIsShowingSideMenu).toHaveBeenCalledWith(true)
  })
});

describe('Mobile title bar - Basic with missing translate code', () => {
  const mockCallBackIsShowingSideMenu = jest.fn();

  beforeEach(() => {
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <MobileTitleBar
            isShowingSideMenu={false}
            callbackSetIsShowingSideMenu={mockCallBackIsShowingSideMenu}
            isViewingDetail={false}
            isQuiz={false}
            isEdit={false}
          />
        </Provider>
      </ResponsiveContext.Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "mobile-title-bar" })).toBeInTheDocument();
    })
  })
})

describe('Mobile title bar - Edit item mode', () => {
  beforeEach(() => {
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <MobileTitleBar
            isShowingSideMenu={false}
            callbackSetIsShowingSideMenu={jest.fn()}
            isEdit={true}
          />
        </Provider>
      </ResponsiveContext.Provider>)
  })

  it("should navigate to the detail page not in edit mode if clicked on the cancel icon", async () => {
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("button-cancel"))
    })

    expect(true).toBeTruthy();
  })
});
