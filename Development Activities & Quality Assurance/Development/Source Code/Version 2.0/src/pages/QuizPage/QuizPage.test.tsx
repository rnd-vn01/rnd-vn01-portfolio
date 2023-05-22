import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QuizPage } from './QuizPage';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { })
      }
    }
  }
}));

describe('QuizPage', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <QuizPage />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-page" })).toBeInTheDocument();
    })
  })

  it("should trigger interactive function when clicking on controls in panel", async () => {
    render(<Provider store={store}>
      <QuizPage />
    </Provider>)

    fireEvent.click(screen.getAllByRole("model-interaction-control", { name: "model-interaction-control-center" })[0])
    fireEvent.click(screen.getAllByRole("model-interaction-control", { name: "model-interaction-control-left" })[0])
    fireEvent.click(screen.getAllByRole("model-interaction-control", { name: "model-interaction-control-right" })[0])
    fireEvent.click(screen.getAllByRole("model-interaction-control", { name: "model-interaction-control-down" })[0])
    fireEvent.click(screen.getAllByRole("model-interaction-control", { name: "model-interaction-control-up" })[0])
    fireEvent.click(screen.getAllByRole("model-interaction-control", { name: "model-interaction-control-zoom-in" })[0])
    fireEvent.click(screen.getAllByRole("model-interaction-control", { name: "model-interaction-control-zoom-out" })[0])
  })
});
