import { render, screen, waitFor } from '@testing-library/react';
import { SearchProcessor } from './SearchProcessor';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('SearchProcessor', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <SearchProcessor
        callbackSetResults={jest.fn()}
        callbackSetLoading={jest.fn()}
        query={"a"}
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "search-processor" })).toBeInTheDocument();
    })
  })
});
