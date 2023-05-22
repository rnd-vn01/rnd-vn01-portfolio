import { render, screen, waitFor } from '@testing-library/react';
import { FooterBar } from './FooterBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('FooterBar', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <FooterBar />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "footer-bar" })).toBeInTheDocument();
    })
  })
});
