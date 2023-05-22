import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { resetToInitialStatePointSelectionSlice, setShowingQuickInformation } from 'src/redux/slice';
import store from 'src/redux/store';
import { InformationBlock } from './InformationBlock';

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
    location: {
      pathname: []
    }
  }),
  useLocation: () => ({
    pathname: '',
    search: ''
  })
}));

describe('InformationBlock', () => {
  afterEach(() => {
    store.dispatch(resetToInitialStatePointSelectionSlice());
  })

  beforeEach(() => {
    store.dispatch(setShowingQuickInformation({
      quickInformation: true
    }));
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <InformationBlock />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "information-block" })).toBeInTheDocument();
    })
  })

  it("should navigate to the detail page if click on view details for point", async () => {
    render(<Provider store={store}>
      <InformationBlock
        isPoint={true}
        itemInformation={{
          code: "GB-20",
          name: "Name",
          description: "Description",
          functionalities: []
        }}
      />
    </Provider>)

    const viewDetails = screen.getByRole("div", { name: "information-block-view-details" })
    fireEvent.click(viewDetails)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/detail/point/GB-20")
    })
  })

  it("should navigate to the detail page if click on view details for meridian", async () => {
    render(<Provider store={store}>
      <InformationBlock
        isPoint={false}
        itemInformation={{
          code: "LU",
          name: "Lung",
          description: "Description for Lung",
          diseases: "",
        }}
      />
    </Provider>)

    const viewDetails = screen.getByRole("div", { name: "information-block-view-details" })
    fireEvent.click(viewDetails)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/detail/meridian/LU")
    })
  })

  it("should hide the information block if clicked on the icon", async () => {
    render(<Provider store={store}>
      <InformationBlock
        isPoint={false}
        itemInformation={{
          code: "LU",
          name: "Lung",
          description: "Description for Lung",
          diseases: "",
        }}
      />
    </Provider>)

    fireEvent.click(screen.getByRole("div", { name: "information-block-hide-icon" }))

    await waitFor(() => {
      expect(screen.queryByTestId("information-block-title")).toBeNull()
    })
  })
});
