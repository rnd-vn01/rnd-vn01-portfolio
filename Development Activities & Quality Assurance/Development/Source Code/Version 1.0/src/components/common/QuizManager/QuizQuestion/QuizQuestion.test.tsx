import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizQuestion } from './QuizQuestion';

describe('QuizQuestion', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <QuizQuestion />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-question" })).toBeInTheDocument();
    })
  })
});
