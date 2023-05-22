import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HomePage } from './HomePage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import React from 'react';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "TEST_PATH",
    state: {
      isRedirect: true
    }
  })
}));

describe('HomePage redirected entry', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <HomePage />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "home-page" })).toBeInTheDocument();
      expect(screen.getByRole("div", { name: "home-page-landing" })).toHaveClass("home-page__landing--hidden")
    })
  })

  it("should trigger interactive function when clicking on controls in panel", async () => {
    render(<Provider store={store}>
      <HomePage />
    </Provider>)

    fireEvent.click(screen.getByRole("model-interaction-control", { name: "model-interaction-control-center" }))
    fireEvent.click(screen.getByRole("model-interaction-control", { name: "model-interaction-control-left" }))
    fireEvent.click(screen.getByRole("model-interaction-control", { name: "model-interaction-control-right" }))
    fireEvent.click(screen.getByRole("model-interaction-control", { name: "model-interaction-control-down" }))
    fireEvent.click(screen.getByRole("model-interaction-control", { name: "model-interaction-control-up" }))
    fireEvent.click(screen.getByRole("model-interaction-control", { name: "model-interaction-control-zoom-in" }))
    fireEvent.click(screen.getByRole("model-interaction-control", { name: "model-interaction-control-zoom-out" }))
  })
});
