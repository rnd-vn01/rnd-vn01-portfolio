import { render, screen, waitFor } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "TEST_PATH"
  })
}));

describe('LoginPage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <LoginPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "login-page" })).toBeInTheDocument();
    })
  })
});
