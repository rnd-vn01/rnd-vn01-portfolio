import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { resetToInitialStatePointSelectionSlice } from 'src/redux/slice';
import store from 'src/redux/store';
import { MeridianControl } from './MeridianControl';
import { Context as ResponsiveContext } from "react-responsive";

describe('MeridianControl', () => {
  afterEach(() => {
    store.dispatch(resetToInitialStatePointSelectionSlice());
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <MeridianControl />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "meridian-control" })).toBeInTheDocument();
    })
  })

  it("should show dropdown if clicking on the icon and is currently not collapsed", async () => {
    render(<Provider store={store}>
      <MeridianControl />
    </Provider>)

    const getIcon = screen.getByRole("div", { name: "meridian-control-icon" })
    fireEvent.click(getIcon)

    await waitFor(() => {
      const meridianControlDropdown = screen.getByRole("div", { name: "meridian-control-dropdown" })
      expect(meridianControlDropdown).toHaveClass("meridian-control__dropdown--show")
    })
  })

  it("should hide icon if clicking on the icon and is currently collapsed", async () => {
    render(<Provider store={store}>
      <MeridianControl />
    </Provider>)

    const getIcon = screen.getByRole("div", { name: "meridian-control-icon" })
    fireEvent.click(getIcon)
    fireEvent.click(getIcon)

    await waitFor(() => {
      const meridianControlDropdown = screen.getByRole("div", { name: "meridian-control-dropdown" })
      expect(meridianControlDropdown).not.toHaveClass("meridian-control__dropdown--show")
    })
  })

  it("should perform as expected when selected one item from menu for desktop", async () => {
    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <MeridianControl />
      </Provider>
    </ResponsiveContext.Provider>)

    const getIcon = screen.getByRole("div", { name: "meridian-control-icon" })
    fireEvent.click(getIcon)

    const menuItem = screen.getByRole("div", { name: "meridian-control-item-1" })
    fireEvent.click(menuItem)

    await waitFor(() => {
      //Expect the menu to be collapsed
      const meridianControlDropdown = screen.getByRole("div", { name: "meridian-control-dropdown" })
      expect(meridianControlDropdown).not.toHaveClass("meridian-control__dropdown--show")

      //Expect the selected line to be updated
      expect(store.getState().selectionSlice.preSelectLine).toBe("LI")
    })
  })

  it("should perform as expected when selected one item from menu for mobile and tablet", async () => {
    render(<ResponsiveContext.Provider value={{ width: 1000 }}>
      <Provider store={store}>
        <MeridianControl />
      </Provider>
    </ResponsiveContext.Provider>)

    const getIcon = screen.getByRole("div", { name: "meridian-control-icon" })
    fireEvent.click(getIcon)

    const menuItem = screen.getByRole("div", { name: "meridian-control-item-1" })
    fireEvent.click(menuItem)

    await waitFor(() => {
      //Expect the menu to be collapsed
      const meridianControlDropdown = screen.getByRole("div", { name: "meridian-control-dropdown" })
      expect(meridianControlDropdown).not.toHaveClass("meridian-control__dropdown--show")

      //Expect the selected line to be updated
      expect(store.getState().selectionSlice.selectedLabel).toBe("LI")
      expect(store.getState().selectionSlice.selectedType).toBe("line")
    })
  })
});
