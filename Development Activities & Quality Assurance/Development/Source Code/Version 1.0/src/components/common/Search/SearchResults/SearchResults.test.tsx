import { render, screen, waitFor } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { Provider } from 'react-redux';
import store from 'src/redux/store';


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

describe('SearchResults', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <SearchResults
        callbackSetNumberOfMatchingResults={jest.fn()}
        callbackSetChoosingAlphabet={jest.fn()}
        results={[]}
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-results" })).toBeInTheDocument();
    })
  })
});
