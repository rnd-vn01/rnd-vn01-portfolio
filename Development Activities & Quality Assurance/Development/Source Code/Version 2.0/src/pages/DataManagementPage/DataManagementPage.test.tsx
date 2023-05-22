import { render, screen, waitFor } from '@testing-library/react';
import { DataManagementPage } from './DataManagementPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('DataManagementPage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <DataManagementPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "data-management-page" })).toBeInTheDocument();
    })
  })
});
