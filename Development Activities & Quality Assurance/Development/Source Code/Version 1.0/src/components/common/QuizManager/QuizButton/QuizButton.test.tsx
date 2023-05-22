import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizButton } from './QuizButton';

describe('QuizButton', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <QuizButton />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-button" })).toBeInTheDocument();
    })
  })
});
