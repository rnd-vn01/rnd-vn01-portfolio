import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { resetToInitialStateNavigationSlice, resetToInitialStatePointSelectionSlice, setBackFromInformationBlock, setQuickSearchPersistQuery, setShowingQuickInformation } from 'src/redux/slice';
import store from 'src/redux/store';
import { InformationBlock } from './InformationBlock';
import { Context as ResponsiveContext } from "react-responsive";

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
    store.dispatch(resetToInitialStateNavigationSlice());
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
    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <InformationBlock
          isPoint={true}
          itemInformation={{
            code: "GB-20",
            name: "Name",
            description: "Description",
            functionalities: []
          }}
        />
      </Provider>
    </ResponsiveContext.Provider>)

    const viewDetails = screen.getByRole("div", { name: "information-block-view-details" })
    fireEvent.click(viewDetails)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/detail/point/GB-20")
    })
  })

  it("should navigate to the detail page if click on view details for meridian", async () => {
    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <InformationBlock
          isPoint={false}
          itemInformation={{
            code: "LU",
            name: "Lung",
            description: "Description for Lung",
            diseases: "",
          }}
        />
      </Provider>
    </ResponsiveContext.Provider>)

    const viewDetails = screen.getByRole("div", { name: "information-block-view-details" })
    fireEvent.click(viewDetails)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/detail/meridian/LU")
    })
  })

  it("should hide the information block if clicked on the icon", async () => {
    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <InformationBlock
          isPoint={false}
          itemInformation={{
            code: "LU",
            name: "Lung",
            description: "Description for Lung",
            diseases: "",
          }}
        />
      </Provider>
    </ResponsiveContext.Provider>)

    fireEvent.click(screen.getByRole("div", { name: "information-block-hide-icon" }))

    await waitFor(() => {
      expect(screen.queryByTestId("information-block-title")).toBeNull()
    })
  })

  describe("InformationBlock tablet", () => {
    it("to be rendered successfully", async () => {
      render(<ResponsiveContext.Provider value={{ width: 800 }}>
        <Provider store={store}>
          <InformationBlock />
        </Provider>
      </ResponsiveContext.Provider>)

      await waitFor(() => {
        expect(screen.getByRole("div", { name: "information-block" })).toBeInTheDocument();
      })
    })

    it("should navigate to the detail page if click on view details for point", async () => {
      render(<ResponsiveContext.Provider value={{ width: 800 }}>
        <Provider store={store}>
          <InformationBlock
            isPoint={true}
            itemInformation={{
              code: "GB-20",
              name: "Name",
              description: "Description",
              functionalities: []
            }}
          />
        </Provider>
      </ResponsiveContext.Provider>)

      const viewDetails = screen.getByRole("div", { name: "information-block-view-details" })
      fireEvent.click(viewDetails)

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith("/detail/point/GB-20")
      })
    })

    it("should navigate to the detail page if click on view details for meridian", async () => {
      render(<ResponsiveContext.Provider value={{ width: 800 }}>
        <Provider store={store}>
          <InformationBlock
            isPoint={false}
            itemInformation={{
              code: "LU",
              name: "Lung",
              description: "Description for Lung",
              diseases: "",
            }}
          />
        </Provider>
      </ResponsiveContext.Provider>)

      const viewDetails = screen.getByRole("div", { name: "information-block-view-details" })
      fireEvent.click(viewDetails)

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith("/detail/meridian/LU")
      })
    })

    it("should hide the information block if clicked on the icon", async () => {
      render(<ResponsiveContext.Provider value={{ width: 800 }}>
        <Provider store={store}>
          <InformationBlock
            isPoint={false}
            itemInformation={{
              code: "LU",
              name: "Lung",
              description: "Description for Lung",
              diseases: "",
            }}
          />
        </Provider>
      </ResponsiveContext.Provider>)

      fireEvent.click(screen.getByRole("div", { name: "information-block-hide-icon" }))

      await waitFor(() => {
        expect(screen.queryByTestId("information-block-title")).toBeNull()
      })
    })

    it("should render the back icon if displayed by search result selected", async () => {
      store.dispatch(setQuickSearchPersistQuery("sampleQuery"))
      store.dispatch(setBackFromInformationBlock(false))

      render(<ResponsiveContext.Provider value={{ width: 1200 }}>
        <Provider store={store}>
          <InformationBlock
            isPoint={false}
            itemInformation={{
              code: "LU",
              name: "Lung",
              description: "Description for Lung",
              diseases: "",
            }}
          />
        </Provider>
      </ResponsiveContext.Provider>)

      await waitFor(() => {
        expect(screen.queryByTestId("icon-back")).toBeTruthy()
      })

      fireEvent.click(screen.queryByTestId("icon-back"))

      await waitFor(() => {
        expect(store.getState().navigationSlice.backFromInformationBlock).toBeTruthy()
      })
    })
  })
});
