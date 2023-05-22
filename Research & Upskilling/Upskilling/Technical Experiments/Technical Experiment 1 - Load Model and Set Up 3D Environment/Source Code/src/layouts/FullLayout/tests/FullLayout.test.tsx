import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { FullLayout } from '../FullLayout';

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: []
    }
  }),
  useLocation: () => ({
    pathname: '',
    search: ''
  })
}));

describe('Full layout', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <FullLayout />
    </Provider>)
  })

  it("should be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "full-layout" })).toBeInTheDocument();
    })
  })
})
