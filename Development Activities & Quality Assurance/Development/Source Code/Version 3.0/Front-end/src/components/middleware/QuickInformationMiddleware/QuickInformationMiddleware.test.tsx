import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QuickInformationMiddleware } from './QuickInformationMiddleware';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import {
  resetToInitialStateLanguageSlice,
  resetToInitialStatePointSelectionSlice,
  setLineSelectedByLabel,
  setPointSelected,
  setStateLanguage
} from 'src/redux/slice';
import { mockGetItemByCode } from 'src/api/mocks/items/mockGetItemByCode';

describe('QuickInformationMiddleware', () => {
  beforeAll(() => {
    mockGetItemByCode()
  })

  afterEach(() => {
    store.dispatch(resetToInitialStatePointSelectionSlice());
    store.dispatch(resetToInitialStateLanguageSlice())
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <QuickInformationMiddleware />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quick-information-middleware" })).toBeInTheDocument();
    })
  })

  it("should update quick information on point selected", async () => {
    store.dispatch(setPointSelected({
      selectedLabel: "BL-20",
      pointPosition: {
        x: 0.8,
        y: 0.025,
        z: -2.7
      }
    }))

    render(<Provider store={store}>
      <QuickInformationMiddleware />
    </Provider>)

    await waitFor(() => {
      expect(store.getState().selectionSlice.isShowingQuickInformation.content.code).toBe("BL-20")
    })
  })

  it("should update quick information on meridian selected", async () => {
    store.dispatch(setLineSelectedByLabel({
      selectedLine: "LU",
    }))

    render(<Provider store={store}>
      <QuickInformationMiddleware />
    </Provider>)

    await waitFor(() => {
      expect(store.getState().selectionSlice.isShowingQuickInformation.content.code).toBe("LU")
    })
  })

  it("should update Vietnamese information on point selected", async () => {
    store.dispatch(setPointSelected({
      selectedLabel: "BL-20",
      pointPosition: {
        x: 0.8,
        y: 0.025,
        z: -2.7
      }
    }))

    store.dispatch(setStateLanguage({
      currentLanguage: "VI"
    }))

    render(<Provider store={store}>
      <QuickInformationMiddleware />
    </Provider>)

    await waitFor(() => {
      expect(store.getState().selectionSlice.isShowingQuickInformation.content.name).toBe("Tỳ du")
    })
  })

  it("should update Vietnamese information on meridian selected", async () => {
    store.dispatch(setLineSelectedByLabel({
      selectedLine: "LU",
    }))

    store.dispatch(setStateLanguage({
      currentLanguage: "VI"
    }))

    render(<Provider store={store}>
      <QuickInformationMiddleware />
    </Provider>)

    await waitFor(() => {
      expect(store.getState().selectionSlice.isShowingQuickInformation.content.name).toBe("Thủ Thái Âm Phế")
    })
  })
});
