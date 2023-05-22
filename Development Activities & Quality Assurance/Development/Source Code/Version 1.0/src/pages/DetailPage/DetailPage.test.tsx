import { render, screen, waitFor } from '@testing-library/react';
import { DetailPage } from './DetailPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: '/detail/point/GB-20?query=search',
    search: 'query=search'
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('DetailPage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <DetailPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "detail-page" })).toBeInTheDocument();
    })
  })
});
