import {
  resetToInitialStatePointSelectionSlice,
  setIsCurrentMouseMovePosition,
  setIsCurrentMousePosition,
  setIsHoveringLine,
  setIsHoveringPoint,
  setLineHover,
  setLineSelected
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
        "z": -3.35
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
        "z": 100
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
})
