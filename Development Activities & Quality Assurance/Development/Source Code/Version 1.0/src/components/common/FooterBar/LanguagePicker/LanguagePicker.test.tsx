import { render, screen, waitFor } from '@testing-library/react';
import { LanguagePicker } from './LanguagePicker';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('LanguagePicker', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <LanguagePicker />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "language-picker" })).toBeInTheDocument();
    })
  })
});
