import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizStatusBar } from './QuizStatusBar';

describe('QuizStatusBar', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <QuizStatusBar />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-status-bar" })).toBeInTheDocument();
    })
  })
});
