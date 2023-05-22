import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Input } from './Input';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('Input', () => {
  it("to be rendered successfully", async () => {
    render(<Input />)

    await waitFor(() => {
      expect(screen.getByRole("input", { name: "input" })).toBeInTheDocument();
    })
  })

  it("should change to text if input box is of type password and is choosing to show password", async () => {
    render(<Input
      type={'password'}
      value={'ABCDEF'}
    />)

    const showPasswordIcon = screen.getByRole("div", { name: "show-password-icon" })
    fireEvent.click(showPasswordIcon)

    await waitFor(() => {
      const inputBox = screen.getByRole("input", { name: "input" })
      expect((inputBox as any).type).toBe("text")
    })
  })

  it("should display label if passed as param", async () => {
    render(<Input
      type={'text'}
      value={'ABCDEF'}
      label={'label'}
      error={''}
    />)

    const label = screen.getByRole("label");
    expect(label).toBeInTheDocument();
  })

  it("should show error and highlight if error is passed as param", async () => {
    render(<Input
      type={'text'}
      value={'ABCDEF'}
      error={'error'}
    />)

    const error = screen.getByRole("p", { name: "error" });
    expect(error).toBeInTheDocument();

    const inputBox = screen.getByRole("input", { name: "input" })
    expect(inputBox).toHaveClass("input__error")
  })

  it("should set the input as readonly if passed as param", async () => {
    render(<Input
      type={'text'}
      value={'ABCDEF'}
      name={'name'}
      readonly={true}
    />)

    const inputBox = screen.getByRole("input", { name: "input-name" })
    expect(inputBox).toHaveClass("input--readonly")
  })
});
