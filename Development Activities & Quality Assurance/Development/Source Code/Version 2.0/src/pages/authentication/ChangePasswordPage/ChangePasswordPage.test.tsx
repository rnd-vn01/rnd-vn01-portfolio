import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ChangePasswordPage } from './ChangePasswordPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import Swal from 'sweetalert2';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "TEST_PATH"
  })
}));

describe('LoginPage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <ChangePasswordPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "password-reset-page" })).toBeInTheDocument();
    })
  })

  it("should show error if type in invalid email and clicked submit", async () => {
    let inputEmail = screen.getByTestId("input-email")
    fireEvent.change(inputEmail, { target: { value: "abc" } })

    let submitButton = screen.getByRole("button", { name: "button-change-password" })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(inputEmail.getAttribute("aria-invalid")).toBeTruthy()
    })
  })

  it("should continue the flow if email is valid and clicked submit", async () => {
    let inputEmail = screen.getByTestId("input-email")
    fireEvent.change(inputEmail, { target: { value: "abc@email.com" } })

    let submitButton = screen.getByRole("button", { name: "button-change-password" })
    fireEvent.click(submitButton)

    await waitFor(() => {

    })
  })
});
