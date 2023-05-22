import { render, screen, waitFor } from '@testing-library/react';
import { ItemDetailEdit } from './ItemDetailEdit';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('ItemDetailEdit', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <ItemDetailEdit
        item={{}} />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "item-detail-edit" })).toBeInTheDocument();
    })
  })
});
