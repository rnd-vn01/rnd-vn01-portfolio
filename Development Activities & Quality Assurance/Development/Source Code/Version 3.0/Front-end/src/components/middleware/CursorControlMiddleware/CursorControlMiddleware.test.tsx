import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CursorControlMiddleware } from './CursorControlMiddleware';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { resetToInitialStatePointSelectionSlice, setIsHoveringLine, setIsHoveringPoint } from 'src/redux/slice';

describe('CursorControlMiddleware', () => {
  afterEach(() => {
    store.dispatch(resetToInitialStatePointSelectionSlice());
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <CursorControlMiddleware />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "cursor-control-middleware" })).toBeInTheDocument();
    })
  })

  it("should update the cursor to pointer if hovering", async () => {
    store.dispatch(setIsHoveringLine({
      isHoveringLine: true
    }))

    render(<Provider store={store}>
      <CursorControlMiddleware />
    </Provider>)

    await waitFor(() => {
      expect(document.body.style.cursor).toBe("pointer")
    })
  })

  it("should update the cursor to default if hovering", async () => {
    store.dispatch(setIsHoveringLine({
      isHoveringLine: false
    }))
    store.dispatch(setIsHoveringPoint({
      isHoveringPoint: false
    }))

    render(<Provider store={store}>
      <CursorControlMiddleware />
    </Provider>)

    await waitFor(() => {
      expect(document.body.style.cursor).toBe("default")
    })
  })
});
