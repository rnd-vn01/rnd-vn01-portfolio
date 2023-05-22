import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizSummary } from './QuizSummary';

describe('QuizSummary', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <QuizSummary />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-summary" })).toBeInTheDocument();
    })
  })
});
