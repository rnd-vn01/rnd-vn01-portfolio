import { waitFor } from "@testing-library/react"
import {
  resetToInitialStateNavigationSlice,
  resetToInitialStatePointSelectionSlice,
  setBackFromInformationBlock,
  setQuickSearchPersistQuery,

} from "src/redux/slice"
import store from "src/redux/store"

describe("navigationSlice", () => {
  afterEach(() => {
    store.dispatch(resetToInitialStateNavigationSlice())
  })

  it("should reset everything if called reset to initial state", async () => {
    store.dispatch(setQuickSearchPersistQuery("abcdef"))

    store.dispatch(resetToInitialStateNavigationSlice())

    await waitFor(() => {
      expect(store.getState().navigationSlice.quickSearchPersistQuery).toBe('')
    })
  })

  it("should update back from information block if called", async () => {
    store.dispatch(setBackFromInformationBlock(true))

    await waitFor(() => {
      expect(store.getState().navigationSlice.backFromInformationBlock).toBeTruthy()
    })
  })
})
