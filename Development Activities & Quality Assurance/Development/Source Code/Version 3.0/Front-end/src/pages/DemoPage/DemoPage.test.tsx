import { render, screen, waitFor } from '@testing-library/react';
import { DemoPage } from './DemoPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('DemoPage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <DemoPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "demo-page" })).toBeInTheDocument();
    })
  })
});
