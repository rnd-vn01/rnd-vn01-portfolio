import { render, screen, waitFor } from '@testing-library/react';
import { ItemDetail } from './ItemDetail';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('ItemDetail', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <ItemDetail
        item={{}} />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "item-detail" })).toBeInTheDocument();
    })
  })
});
