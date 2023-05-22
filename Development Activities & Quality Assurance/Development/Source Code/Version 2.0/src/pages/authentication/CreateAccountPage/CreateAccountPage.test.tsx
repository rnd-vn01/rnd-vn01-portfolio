import { render, screen, waitFor } from '@testing-library/react';
import { CreateAccountPage } from './CreateAccountPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('CreateAccountPage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <CreateAccountPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "create-account-page" })).toBeInTheDocument();
    })
  })
});
