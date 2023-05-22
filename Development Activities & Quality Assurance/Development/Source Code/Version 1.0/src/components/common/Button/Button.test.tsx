import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should call the onClick function when is not disabled', () => {
    const onClick = jest.fn();

    render(<Button isDisabled={false} onClick={onClick} name="test" />)

    let getButton = screen.getByRole("button", { name: "button-test" });
    fireEvent.click(getButton);

    expect(onClick).toBeCalled();
  })

  it('should not call the onClick function when is disabled', () => {
    const onClick = jest.fn();

    render(<Button isDisabled={true} onClick={onClick} name="test" />)

    let getButton = screen.getByRole("button", { name: "button-test" });
    fireEvent.click(getButton);

    expect(onClick).not.toBeCalled();
  })

  it('should set the name of button as "button" if no name is passed', () => {
    render(<Button />)

    let getButton = screen.getByRole("button", { name: "button" });
    expect(getButton).toBeInTheDocument();
  })
})
