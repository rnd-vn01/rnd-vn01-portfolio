import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LanguagePicker } from './LanguagePicker';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { resetToInitialStateLanguageSlice } from 'src/redux/slice';

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    go: jest.fn(),
    location: {
      pathname: []
    }
  }),
  useLocation: () => ({
    pathname: '',
    search: ''
  })
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { })
      }
    }
  }
}));

describe('LanguagePicker', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <LanguagePicker />
    </Provider>)
  })

  afterEach(() => {
    store.dispatch(resetToInitialStateLanguageSlice())
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "language-picker" })).toBeInTheDocument();
    })
  })

  it("should update the language if change selection on the picker", async () => {
    // Trigger to show the picker
    const languagePickerIcon = screen.getByRole("div", { name: "language-picker-icon" })
    fireEvent.click(languagePickerIcon)

    const options = screen.getAllByRole("language-picker-dropdown-item");
    fireEvent.click(options[1])

    await waitFor(() => {
      expect(store.getState().languageSlice.currentLanguage).toBe("VI")
    })
  })
});
