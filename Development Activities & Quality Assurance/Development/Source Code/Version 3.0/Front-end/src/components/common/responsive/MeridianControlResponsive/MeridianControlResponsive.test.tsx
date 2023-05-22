import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { resetToInitialStatePointSelectionSlice, setPointSelectedByLabel } from 'src/redux/slice';
import store from 'src/redux/store';
import { MeridianControlResponsive } from './MeridianControlResponsive';
import { Context as ResponsiveContext } from "react-responsive";

describe('MeridianControlResponsive', () => {
  afterEach(() => {
    store.dispatch(resetToInitialStatePointSelectionSlice());
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <MeridianControlResponsive />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "meridian-control" })).toBeInTheDocument();
    })
  })

  it("should show dropdown if clicking on the icon and is currently not collapsed", async () => {
    render(<Provider store={store}>
      <MeridianControlResponsive />
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
      <MeridianControlResponsive />
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
        <MeridianControlResponsive />
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

  it("should deselect selected item if choosing a meridian from menu for desktop", async () => {
    store.dispatch(setPointSelectedByLabel({
      selectedPoint: "BL-2"
    }))

    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <MeridianControlResponsive />
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
      expect(store.getState().selectionSlice.selectedLabel).toBe(null)
    })
  })

  it("should perform as expected when selected one item from menu for mobile and tablet", async () => {
    render(<ResponsiveContext.Provider value={{ width: 1000 }}>
      <Provider store={store}>
        <MeridianControlResponsive />
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
