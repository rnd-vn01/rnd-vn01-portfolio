import { render, screen, waitFor } from '@testing-library/react';
import { Input } from './Input';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('Input', () => {
  beforeEach(() => {
    render(<Input />)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("input", { name: "input" })).toBeInTheDocument();
    })
  })
});
