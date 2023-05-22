import { render, screen, waitFor } from '@testing-library/react';
import { SearchResultItem } from './SearchResultItem';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: '',
      search: ''
    }
  }),
  useLocation: () => ({
    pathname: '',
    search: ''
  })
}));

describe('SearchResultItem', () => {
  beforeEach(() => {
    render(<Provider store={store}><SearchResultItem
      item={{
        code: "LU-20"
      }}
    /></Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-result" })).toBeInTheDocument();
    })
  })
});
