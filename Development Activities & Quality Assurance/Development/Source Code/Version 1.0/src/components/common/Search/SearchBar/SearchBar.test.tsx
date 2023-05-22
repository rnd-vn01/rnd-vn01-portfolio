import { render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('SearchBar', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <SearchBar
        callbackSetResults={jest.fn()}
        callbackSetLoading={jest.fn()}
        callbackSetQuery={jest.fn()}
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-bar" })).toBeInTheDocument();
    })
  })
});
