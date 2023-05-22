import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { resetToInitialStatePointSelectionSlice, setPointSelectedByLabel } from 'src/redux/slice';
import store from 'src/redux/store';
import { MeridianControl } from './MeridianControl';
import { Context as ResponsiveContext } from "react-responsive";

describe('MeridianControl', () => {
  afterEach(() => {
    store.dispatch(resetToInitialStatePointSelectionSlice());
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <MeridianControl
        callbackResetViewMode={jest.fn()}
      />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "meridian-control-desktop" })).toBeInTheDocument();
    })
  })

  it("should perform as expected when selected one item from menu for desktop", async () => {
    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <MeridianControl callbackResetViewMode={jest.fn()} />
      </Provider>
    </ResponsiveContext.Provider>)

    const menuItem = screen.getByRole("div", { name: "meridian-control-item-1" })
    fireEvent.click(menuItem)

    await waitFor(() => {
      //Expect the selected line to be updated
      expect(store.getState().selectionSlice.preSelectLine).toBe("LI")
    })
  })

  it("should deselect selected item if choosing a meridian from menu for desktop", async () => {
    store.dispatch(setPointSelectedByLabel({
      selectedPoint: "BL-2"
    }))

    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <MeridianControl callbackResetViewMode={jest.fn()} />
      </Provider>
    </ResponsiveContext.Provider>)


    const menuItem = screen.getByRole("div", { name: "meridian-control-item-1" })
    fireEvent.click(menuItem)

    await waitFor(() => {
      //Expect the selected line to be updated
      expect(store.getState().selectionSlice.preSelectLine).toBe("LI")
      expect(store.getState().selectionSlice.selectedLabel).toBe(null)
    })
  })

  it("should scroll to the right while clicking on the button", async () => {
    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <MeridianControl callbackResetViewMode={jest.fn()} />
      </Provider>
    </ResponsiveContext.Provider>)

    await waitFor(() => {
      const mockScrollBy = jest.fn();
      const scrollableDiv = screen.getByRole("div", { name: "meridian-control-desktop-mask" })
      scrollableDiv.scrollBy = mockScrollBy;

      fireEvent.click(screen.getByRole("button", { name: "meridian-control-scroll-right" }))
      expect(mockScrollBy).toHaveBeenCalledWith(145, 0);
    })
  })

  it("should scroll to the left while clicking on the button", async () => {
    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <MeridianControl callbackResetViewMode={jest.fn()} />
      </Provider>
    </ResponsiveContext.Provider>)

    await waitFor(() => {
      const mockScrollBy = jest.fn();
      const scrollableDiv = screen.getByRole("div", { name: "meridian-control-desktop-mask" })
      scrollableDiv.scrollBy = mockScrollBy;

      fireEvent.click(screen.getByRole("button", { name: "meridian-control-scroll-left" }))
      expect(mockScrollBy).toHaveBeenCalledWith(-145, 0);
    })
  })

  it("should deselect a meridian if clicked on the meridian while selected", async () => {
    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <MeridianControl callbackResetViewMode={jest.fn()} />
      </Provider>
    </ResponsiveContext.Provider>)


    const menuItem = screen.getByRole("div", { name: "meridian-control-item-1" })
    fireEvent.click(menuItem)

    await waitFor(() => {
      expect(store.getState().selectionSlice.preSelectLine).toBe("LI")
    })

    fireEvent.click(menuItem)

    await waitFor(() => {
      expect(store.getState().selectionSlice.preSelectLine).toBe(null)
    })
  })
});
