import { waitFor } from "@testing-library/react"
import { getNeighborPoints } from "src/helpers/getNeighborsPoints"
import {
  resetToInitialStatePointSelectionSlice,
  setIsCurrentMouseMovePosition,
  setIsCurrentMousePosition,
  setIsHoveringLine,
  setIsHoveringPoint,
  setLineHover,
  setLineSelected,
  setPointSelected,
  setPointSelectedByLabel,
  setRemoveBackup,
} from "src/redux/slice"
import store from "src/redux/store"

describe("selectionSlice", () => {
  afterEach(() => {
    store.dispatch(resetToInitialStatePointSelectionSlice())
  })

  it("setLineSelected select BL meridian", async () => {
    store.dispatch(setIsCurrentMousePosition({
      currentMousePosition: {
        "x": 0.8,
        "y": 5.325,
        "z": -3.35,
        isMobile: false
      }
    }))

    store.dispatch(setLineSelected({}))

    expect(store.getState().selectionSlice.selectedLabel).toBe("BL")
    expect(store.getState().selectionSlice.selectedType).toBe("line")
    expect(store.getState().selectionSlice.isSelectingFromMenu).not.toBeTruthy()
  })

  it("should update is hovering point as true if called from UI", async () => {
    store.dispatch(setIsHoveringPoint({
      isHoveringPoint: true
    }))

    expect(store.getState().selectionSlice.isHoveringPoint).toBeTruthy()
  })

  it("should update is hovering point as false if called from UI", async () => {
    store.dispatch(setIsHoveringPoint({
      isHoveringPoint: false
    }))

    expect(store.getState().selectionSlice.isHoveringPoint).not.toBeTruthy()
  })

  it("should update is hovering line as true if called from UI", async () => {
    store.dispatch(setIsHoveringLine({
      isHoveringLine: true
    }))

    expect(store.getState().selectionSlice.isHoveringLine).toBeTruthy()
  })

  it("should update is hovering line as true if called from UI", async () => {
    store.dispatch(setIsHoveringLine({
      isHoveringLine: false
    }))

    expect(store.getState().selectionSlice.isHoveringLine).not.toBeTruthy()
  })

  it("should update hovering line to BL if update mouse move position to a close enough point", async () => {
    store.dispatch(setIsCurrentMouseMovePosition({
      currentMouseMovePosition: {
        "x": 0.8,
        "y": 5.325,
        "z": -3.35
      }
    }))

    expect(store.getState().selectionSlice.hoveringLineLabel).toBe("BL")
  })

  it("should update hovering line to null if none of the meridians are in close enough region", async () => {
    store.dispatch(setIsCurrentMouseMovePosition({
      currentMouseMovePosition: {
        "x": 100,
        "y": 100,
        "z": 100
      }
    }))

    expect(store.getState().selectionSlice.hoveringLineLabel).toBeNull()
  })

  it("should update hovering line as BL if called using old method", async () => {
    store.dispatch(setIsCurrentMouseMovePosition({
      currentMouseMovePosition: {
        "x": 0.8,
        "y": 5.325,
        "z": -3.35
      }
    }))

    store.dispatch(setLineHover({}))

    expect(store.getState().selectionSlice.hoveringLineLabel).toBe("BL")
  })

  it("should do nothing if called set line selected but none mouse position was captured", async () => {
    store.dispatch(setIsCurrentMousePosition({
      currentMousePosition: null
    }))

    store.dispatch(setLineSelected({}))

    expect(store.getState().selectionSlice.hoveringLineLabel).toBeNull()
  })

  it("should set line selected as null if current mouse position captured is too far away", async () => {
    store.dispatch(setIsCurrentMousePosition({
      currentMousePosition: {
        "x": 100,
        "y": 100,
        "z": 100,
        isMobile: false
      }
    }))

    store.dispatch(setLineSelected({}))

    expect(store.getState().selectionSlice.hoveringLineLabel).toBeNull()
  })

  it("should update hovering line to null if none mouse position is captured", async () => {
    store.dispatch(setIsCurrentMouseMovePosition({
      currentMouseMovePosition: null
    }))

    expect(store.getState().selectionSlice.hoveringLineLabel).toBeNull()
  })

  it("should update hovering line as null if called using old method but none mouse position was captured", async () => {
    store.dispatch(setIsCurrentMouseMovePosition({
      currentMouseMovePosition: null
    }))

    store.dispatch(setLineHover({}))

    expect(store.getState().selectionSlice.hoveringLineLabel).toBeNull()
  })

  it("should update hovering line as null if called using old method, mouse position captured but too far away", async () => {
    store.dispatch(setIsCurrentMouseMovePosition({
      currentMouseMovePosition: {
        "x": 100,
        "y": 100,
        "z": 100
      }
    }))

    store.dispatch(setLineHover({}))

    expect(store.getState().selectionSlice.hoveringLineLabel).toBeNull()
  })

  it("should set the secondary meridian selected if passed the condition", async () => {
    store.dispatch(setPointSelected({
      selectedLabel: "LU-1",
      pointPosition: {
        x: -4,
        y: 6.4,
        z: 1.05
      }
    }))

    await waitFor(() => {
      store.dispatch(resetToInitialStatePointSelectionSlice());
    })

    await waitFor(() => {
      store.dispatch(setPointSelected({
        selectedLabel: "ST-14",
        pointPosition: {
          x: -3.3,
          y: 5.842,
          z: 1.7
        }
      }))
    })

    await waitFor(() => {
      expect(store.getState().selectionSlice.secondarySelectedMeridian).toBe("LU")
    })
  })

  it("should set the neighbor list when a point is selected from quick search result", async () => {
    const SELECTED_POINT = "LU-1"

    store.dispatch(setPointSelectedByLabel({
      selectedPoint: SELECTED_POINT
    }))

    await waitFor(() => {
      expect(store.getState().selectionSlice.showingNeighbors).toStrictEqual(
        getNeighborPoints(SELECTED_POINT, true, 1.75, "unlimited")
      )
    })
  })

  it("should skip the check for secondary meridian if is first point selected", async () => {
    await waitFor(() => {
      store.dispatch(resetToInitialStatePointSelectionSlice());
    })

    store.dispatch(setPointSelected({
      selectedLabel: "LU-1",
      pointPosition: {
        x: -4,
        y: 6.4,
        z: 1.05
      }
    }))

    await waitFor(() => {
      store.dispatch(resetToInitialStatePointSelectionSlice());
    })
  })

  it("should reset if called remove backup data", async () => {
    store.dispatch(setRemoveBackup())

    await waitFor(() => {
      expect(store.getState().selectionSlice.backupSelectedPoint).toBe("")
      expect(store.getState().selectionSlice.backupSelectedNeighbors).toStrictEqual([])
    })
  })

  it("should reset to initial state if called reset from initial", async () => {
    store.dispatch(resetToInitialStatePointSelectionSlice())

    await waitFor(() => {
      expect(store.getState().selectionSlice.backupSelectedPoint).toBe("")
      expect(store.getState().selectionSlice.backupSelectedNeighbors).toStrictEqual([])
    })
  })

  it("should do nothing if called selected point with null param", async () => {
    store.dispatch(setPointSelected({
      selectedLabel: null
    }))

    await waitFor(() => {
      expect(store.getState().selectionSlice.secondarySelectedMeridian).toBeNull()
    })
  })

  it("should check for second point meridian if not deselect first, simulating the case none reset was called", async () => {
    store.dispatch(setPointSelected({
      selectedLabel: "LU-1",
      pointPosition: {
        x: -4,
        y: 6.4,
        z: 1.05
      }
    }))

    await waitFor(() => {
      store.dispatch(setPointSelected({
        selectedLabel: "ST-14",
        pointPosition: {
          x: -3.3,
          y: 5.842,
          z: 1.7
        }
      }))
    })

    await waitFor(() => {
      expect(store.getState().selectionSlice.secondarySelectedMeridian).toBe("LU")
    })
  })

  it("should update the selection for second meridian if select third point", async () => {
    store.dispatch(setPointSelected({
      selectedLabel: "LU-1",
      pointPosition: {
        x: -4,
        y: 6.4,
        z: 1.05
      }
    }))

    await waitFor(() => {
      store.dispatch(setPointSelected({
        selectedLabel: "ST-14",
        pointPosition: {
          x: -3.3,
          y: 5.842,
          z: 1.7
        }
      }))
    })

    await waitFor(() => {
      store.dispatch(setPointSelected({
        selectedLabel: "SP-20",
        pointPosition: {
          x: -3.8,
          y: 4.75,
          z: 2.2
        }
      }))
    })

    await waitFor(() => {
      expect(store.getState().selectionSlice.secondarySelectedMeridian).toBe("ST")
    })
  })

  it("should perform as expected for selection of secondary meridian if select point same as current meridian", async () => {
    store.dispatch(setPointSelected({
      selectedLabel: "LU-1",
      pointPosition: {
        x: -4,
        y: 6.4,
        z: 1.05
      }
    }))

    await waitFor(() => {
      store.dispatch(setPointSelected({
        selectedLabel: "LU-2",
        pointPosition: {
          x: -4,
          y: 6.9,
          z: 0.75
        }
      }))
    })

    await waitFor(() => {
      expect(store.getState().selectionSlice.secondarySelectedMeridian).toBeNull()
    })
  })

  it("should select a line if double click on a position close enough to a line", async () => {
    store.dispatch(setIsCurrentMousePosition({
      currentMousePosition: {
        "x": 0.8,
        "y": 5.325,
        "z": -3.35,
        isMobile: true
      }
    }))

    expect(store.getState().selectionSlice.selectedLabel).toBe("BL")
    expect(store.getState().selectionSlice.selectedType).toBe("line")
    expect(store.getState().selectionSlice.isSelectingFromMenu).not.toBeTruthy()
  })

  it("should select a line if double click on a position not close enough to a line", async () => {
    store.dispatch(setIsCurrentMousePosition({
      currentMousePosition: {
        "x": 100,
        "y": 100,
        "z": 100,
        isMobile: true
      }
    }))

    expect(store.getState().selectionSlice.selectedLabel).toBe(null)
    expect(store.getState().selectionSlice.selectedType).toBe(null)
    expect(store.getState().selectionSlice.isSelectingFromMenu).not.toBeTruthy()
  })
})
