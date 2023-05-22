import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AboutPage } from './AboutPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { Context as ResponsiveContext } from "react-responsive";

describe('About Page - Desktop', () => {
  beforeEach(() => {
    render(
      <ResponsiveContext.Provider value={{ width: 1200 }}>
        <Provider store={store}>
          <AboutPage />
        </Provider>
      </ResponsiveContext.Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "about-us-page" })).toBeInTheDocument();
    })
  })

  it("to navigate to member 1 linkedin page if clicked on the logo", async () => {
    const originalWindow = { ...window };
    window.open = jest.fn().mockImplementation(() => originalWindow)

    fireEvent.click(screen.getByTestId("logo-linkedin-member1"))

    await waitFor(() => {
      expect(global.window.open).toHaveBeenCalledWith("https://www.linkedin.com/in/nhannguyen2712/", "_blank")
    })
  })

  it("to navigate to member 2 linkedin page if clicked on the logo", async () => {
    const originalWindow = { ...window };
    window.open = jest.fn().mockImplementation(() => originalWindow)

    fireEvent.click(screen.getByTestId("logo-linkedin-member2"))

    await waitFor(() => {
      expect(global.window.open).toHaveBeenCalledWith("https://www.linkedin.com/in/tanleeb01/", "_blank")
    })
  })

  it("to navigate to member 3 linkedin page if clicked on the logo", async () => {
    const originalWindow = { ...window };
    window.open = jest.fn().mockImplementation(() => originalWindow)

    fireEvent.click(screen.getByTestId("logo-linkedin-member3"))

    await waitFor(() => {
      expect(global.window.open).toHaveBeenCalledWith("https://www.linkedin.com/in/h%E1%BB%93-trang-956940210/", "_blank")
    })
  })

  it("to navigate to member 4 linkedin page if clicked on the logo", async () => {
    const originalWindow = { ...window };
    window.open = jest.fn().mockImplementation(() => originalWindow)

    fireEvent.click(screen.getByTestId("logo-linkedin-member4"))

    await waitFor(() => {
      expect(global.window.open).toHaveBeenCalledWith("https://www.facebook.com/profile.php?id=100086637858961", "_blank")
    })
  })

  it("to navigate to model page if clicked on the item in Resources part", async () => {
    const originalWindow = { ...window };
    window.open = jest.fn().mockImplementation(() => originalWindow)

    fireEvent.click(screen.getByTestId("img-model-asset"))

    await waitFor(() => {
      expect(global.window.open).toHaveBeenCalledWith(
        "https://sketchfab.com/3d-models/study-human-male-sculpt-65836fbba6974f3cbe8fbd7bc6bebc4d",
        "_blank")
    })
  })
});

describe('About Page - Mobile', () => {
  beforeEach(() => {
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <AboutPage />
        </Provider>
      </ResponsiveContext.Provider>)
  })

  it("to include the mobile title bar", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "mobile-title-bar" })).toBeInTheDocument();
      expect(screen.getByRole("div", { name: "side-menu" })).toBeInTheDocument();
    })
  })
})
