import { render, screen, waitFor } from '@testing-library/react';
import { SearchResultsAlphabetFilters } from './SearchResultsAlphabetFilters';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('SearchResultsAlphabetFilters', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <SearchResultsAlphabetFilters
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-results-alphabet-filters" })).toBeInTheDocument();
    })
  })
});
