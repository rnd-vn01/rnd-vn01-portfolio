import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Context as ResponsiveContext } from "react-responsive";
import store from 'src/redux/store';
import { HomePageControl } from './HomePageControl';

describe("HomePageControl", () => {
  it("should use scrollable meridian control if is in desktop viewport", async () => {
    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <HomePageControl />
      </Provider>
    </ResponsiveContext.Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "meridian-control-desktop" })).toBeTruthy();
    })
  })

  it("should use original meridian control if is in mobile viewport", async () => {
    render(<ResponsiveContext.Provider value={{ width: 750 }}>
      <Provider store={store}>
        <HomePageControl />
      </Provider>
    </ResponsiveContext.Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "meridian-control" })).toBeTruthy();
    })
  })

  it("should reset the viewport to center if deselect a meridian from quick meridian icon", async () => {
    const mockcallbackPanCenter = jest.fn();

    render(<ResponsiveContext.Provider value={{ width: 1280 }}>
      <Provider store={store}>
        <HomePageControl
          callbackPanCenter={mockcallbackPanCenter}
        />
      </Provider>
    </ResponsiveContext.Provider>)

    const menuItem = screen.getByRole("div", { name: "meridian-control-item-1" })
    fireEvent.click(menuItem)

    await waitFor(() => {
      expect(store.getState().selectionSlice.preSelectLine).toBe("LI")
    })

    fireEvent.click(menuItem)

    await waitFor(() => {
      expect(mockcallbackPanCenter).toHaveBeenCalled();
    })
  })
})
