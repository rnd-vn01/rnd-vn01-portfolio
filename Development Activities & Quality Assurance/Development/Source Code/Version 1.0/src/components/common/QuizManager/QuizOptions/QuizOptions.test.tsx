import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizOptions } from './QuizOptions';

describe('QuizOptions', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <QuizOptions />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-options" })).toBeInTheDocument();
    })
  })
});
