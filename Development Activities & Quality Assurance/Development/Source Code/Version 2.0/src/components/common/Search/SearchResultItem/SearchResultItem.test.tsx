import { render, screen, waitFor } from '@testing-library/react';
import { SearchResultItem } from './SearchResultItem';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('SearchResultItem', () => {
  beforeEach(() => {
    render(<SearchResultItem
    />)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-result" })).toBeInTheDocument();
    })
  })
});
