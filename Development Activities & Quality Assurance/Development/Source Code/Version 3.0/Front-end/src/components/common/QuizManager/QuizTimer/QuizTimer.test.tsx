import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizTimer } from './QuizTimer';

describe('QuizTimer', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <QuizTimer />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-timer" })).toBeInTheDocument();
    })
  })
});
