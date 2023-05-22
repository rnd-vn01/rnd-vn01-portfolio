import { render, screen, waitFor } from '@testing-library/react';
import { FullPageTitleBar } from './FullPageTitleBar';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('FullPageTitleBar', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <FullPageTitleBar />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "title-bar" })).toBeInTheDocument();
    })
  })
});
