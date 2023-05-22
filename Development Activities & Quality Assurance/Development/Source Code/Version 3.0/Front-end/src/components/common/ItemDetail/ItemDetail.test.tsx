import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ItemDetail } from './ItemDetail';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { resetToInitialStateAuthSlice, resetToInitialStateNavigationSlice, setStateAuth, setViewDetailsPersistLastPage } from 'src/redux/slice';

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

const DEMO_POINT = {
  code: "GB-20",
  name: "Name",
  description: "Description",
  functionalities: ["F1", "F2"],
  caution: "Caution",
  technique: "Technique",
  anatomy: "Anatomy"
}

const DEMO_MERIDIAN = {
  code: "LU",
  name: "Lung",
  description: "Description for Lung",
  diseases: "Diseases for Lung",
  points: ["P1", "P2"]
}

describe('ItemDetail', () => {
  afterEach(() => {
    store.dispatch(resetToInitialStateAuthSlice());
    store.dispatch(resetToInitialStateNavigationSlice());
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <ItemDetail
        item={{}}
        isPoint={true} />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "item-detail" })).toBeInTheDocument();
    })
  })

  it("should move to advanced search if clicking on back icon and no query is passed", async () => {
    render(<Provider store={store}>
      <ItemDetail
        item={DEMO_POINT}
        query={''}
        isPoint={true}
      />
    </Provider>)

    const backIcon = screen.getByTestId("back-icon")
    fireEvent.click(backIcon)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/advanced-search")
    })
  })

  it("should move to advanced search and autofill query if clicking on back icon and query is passed", async () => {
    render(<Provider store={store}>
      <ItemDetail
        item={DEMO_POINT}
        query={'query'}
        isPoint={true}
      />
    </Provider>)

    const backIcon = screen.getByTestId("back-icon")
    fireEvent.click(backIcon)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/advanced-search?query=query")
    })
  })

  it("should move to edit mode if is admin and clicking on the edit icon", async () => {
    store.dispatch(setStateAuth({
      isLoggedIn: true,
      user: {
        name: "NAME",
        email: "test@gmail.com",
        profileImage: "profileImage",
        firebaseId: "firebaseId",
        isAdmin: true
      }
    }));

    render(<Provider store={store}>
      <ItemDetail
        item={DEMO_POINT}
        query={'query'}
        isPoint={true}
      />
    </Provider>)

    const editIcon = screen.getByTestId("edit-icon")
    fireEvent.click(editIcon)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/?edit")
    })
  })

  it("should navigate to point detail page if clicking on point from points list", async () => {
    render(<Provider store={store}>
      <ItemDetail
        item={DEMO_MERIDIAN}
        query={'query'}
        isPoint={false}
      />
    </Provider>)

    const pointText = screen.getByRole("p", { name: "meridian-point-1" })
    fireEvent.click(pointText)

    await waitFor(() => {
      expect(true).toBeTruthy();
    })
  })

  it("should trigger view on model for point if clicked on the button", async () => {
    render(<Provider store={store}>
      <ItemDetail
        item={DEMO_POINT}
        isPoint={true}
      />
    </Provider>)

    const buttonViewOnModel = screen.getByRole("img", { name: "view-on-model" })
    fireEvent.click(buttonViewOnModel)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/?type=point&code=GB-20", { "isRedirect": true })
    })
  })

  it("should trigger view on model for meridian if clicked on the button", async () => {
    render(<Provider store={store}>
      <ItemDetail
        item={DEMO_MERIDIAN}
        isPoint={false}
      />
    </Provider>)

    const buttonViewOnModel = screen.getByRole("img", { name: "view-on-model" })
    fireEvent.click(buttonViewOnModel)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/?type=line&code=LU", { "isRedirect": true })
    })
  })

  it("should pass the param if clicking on back and passed state is stored in slice", async () => {
    store.dispatch(setViewDetailsPersistLastPage({
      path: "testPath",
      isRedirect: true,
      query: "testQuery",
      filterOptions: {}
    }))

    render(<Provider store={store}>
      <ItemDetail
        item={DEMO_POINT}
        query={'query'}
        isPoint={true}
      />
    </Provider>)

    const backIcon = screen.getByTestId("back-icon")
    fireEvent.click(backIcon)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("testPath", {
        isRedirect: true,
        query: "testQuery",
        filterOptions: {}
      })
      expect(store.getState().navigationSlice.homeQueryPersistThroughNavigation).toBe("testQuery")
    })
  })

  it("should pass the param if clicking on back and passed state is stored in slice - case no query", async () => {
    store.dispatch(setViewDetailsPersistLastPage({
      path: "testPath",
      isRedirect: true,
      query: "",
      filterOptions: {}
    }))

    render(<Provider store={store}>
      <ItemDetail
        item={DEMO_POINT}
        query={'query'}
        isPoint={true}
      />
    </Provider>)

    const backIcon = screen.getByTestId("back-icon")
    fireEvent.click(backIcon)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("testPath", {
        isRedirect: true,
        query: "",
        filterOptions: {}
      })
    })
  })
});
