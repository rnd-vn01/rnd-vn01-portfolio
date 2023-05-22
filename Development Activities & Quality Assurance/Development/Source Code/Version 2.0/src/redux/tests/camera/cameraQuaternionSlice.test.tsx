import { resetToInitialStateCreateOrderSlice, setStateCameraQuaternion } from "src/redux/slice"
import store from "src/redux/store"
import { waitFor } from '@testing-library/react';

describe("cameraQuaternionSlice", () => {
  afterEach(() => {
    store.dispatch(resetToInitialStateCreateOrderSlice())
  })

  it("should reset the quaternion to (0, 0, 0, 0) if resetting", async () => {
    store.dispatch(setStateCameraQuaternion({
      x: 5.0,
      y: 6.0,
      z: 7.0,
      w: 8.0
    }))

    store.dispatch(resetToInitialStateCreateOrderSlice())

    expect(store.getState().cameraQuaternionSlice).toStrictEqual({
      x: 0,
      y: 0,
      z: 0,
      w: 0
    })
  })

  it("should update the quaternion if requested", async () => {
    store.dispatch(setStateCameraQuaternion({
      x: 5.0,
      y: 6.0,
      z: 7.0,
      w: 8.0
    }))

    expect(store.getState().cameraQuaternionSlice).toStrictEqual({
      x: 5.0,
      y: 6.0,
      z: 7.0,
      w: 8.0
    })
  })
})
