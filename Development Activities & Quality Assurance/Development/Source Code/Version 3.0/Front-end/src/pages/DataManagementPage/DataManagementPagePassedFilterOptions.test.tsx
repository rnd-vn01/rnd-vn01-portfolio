import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DataManagementPage } from './DataManagementPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { Context as ResponsiveContext } from "react-responsive";
import { mockGetItems } from 'src/api/mocks/items/mockGetItems';

const spyScrollTo = jest.fn();
Object.defineProperty(global.window, 'scrollTo', { value: spyScrollTo });

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: '',
      search: ''
    }
  }),
  useLocation: () => ({
    pathname: '',
    search: '',
    state: {
      filterOptions: {
        searchOn: 1,
        searchBy: 0,
        show: 0,
        sort: 0
      }
    }
  })
}));

describe("Data Management page with passed filter options", () => {
  beforeEach(() => {
    mockGetItems();
    spyScrollTo.mockClear();
    render(
      <ResponsiveContext.Provider value={{ width: 500 }}>
        <Provider store={store}>
          <DataManagementPage />
        </Provider>
      </ResponsiveContext.Provider>)
  })

  it("to update the select options", async () => {
    await waitFor(() => {
      let selectSearchOn = screen.getByRole("select", { name: "select-search-on" })
      expect((selectSearchOn as HTMLSelectElement).value).toBe("1")
    })
  })
})
