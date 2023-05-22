import { render, screen, waitFor } from '@testing-library/react';
import { EditProfilePage } from './EditProfilePage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

describe('EditProfilePage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <EditProfilePage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "edit-profile-page" })).toBeInTheDocument();
    })
  })
});
