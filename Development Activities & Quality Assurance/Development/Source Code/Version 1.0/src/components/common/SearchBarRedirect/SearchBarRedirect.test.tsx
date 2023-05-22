import { render, screen, waitFor } from '@testing-library/react';
import { SearchBarRedirect } from './SearchBarRedirect';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('SearchBarRedirect', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <SearchBarRedirect
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-bar-redirect" })).toBeInTheDocument();
    })
  })
});
