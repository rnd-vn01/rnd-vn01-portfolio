import { render, screen, waitFor } from '@testing-library/react';
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
});
