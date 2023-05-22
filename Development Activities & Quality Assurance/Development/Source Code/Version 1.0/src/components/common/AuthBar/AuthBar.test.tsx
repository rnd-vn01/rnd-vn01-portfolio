import { render, screen, waitFor } from '@testing-library/react';
import { AuthBar } from './AuthBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('AuthBar', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <AuthBar />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "auth-bar" })).toBeInTheDocument();
    })
  })
});
