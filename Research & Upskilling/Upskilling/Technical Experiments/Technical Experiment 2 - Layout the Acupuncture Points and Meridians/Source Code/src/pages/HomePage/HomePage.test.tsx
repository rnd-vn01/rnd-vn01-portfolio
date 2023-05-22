import { render, screen, waitFor } from '@testing-library/react';
import { HomePage } from './HomePage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('Homepage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <HomePage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "homepage" })).toBeInTheDocument();
    })
  })
});
