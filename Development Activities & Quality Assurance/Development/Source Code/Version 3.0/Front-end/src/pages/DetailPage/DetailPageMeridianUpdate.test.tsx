import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DetailPage } from './DetailPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { mockGetUpdateItemCombined } from 'src/api/mocks/items/mockGetUpdateItemCombined';
import { setStateLanguage } from 'src/redux/slice';

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: '/detail/meridian/LU',
    search: 'query=search&edit'
  }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('DetailPage with update point flow', () => {
  beforeAll(() => {
    mockGetUpdateItemCombined();
  })

  beforeEach(() => {
    store.dispatch(setStateLanguage({
      currentLanguage: "EN"
    }))

    render(<Provider store={store}>
      <DetailPage />
    </Provider>)
  })

  it("should update the meridian if clicked", async () => {
    await waitFor(() => {
      const inputName = screen.getByRole("input", { name: "input-name" })
      fireEvent.change(inputName, { target: { value: "Lung Updated" } })

      const points = screen.getAllByRole("meridian-point")
      fireEvent.change(points[1], { target: { value: "LU-2 Updated" } })

      const buttonSubmit = screen.getByRole("div", { name: "button-submit" })
      fireEvent.click(buttonSubmit)
    })
  })
});
