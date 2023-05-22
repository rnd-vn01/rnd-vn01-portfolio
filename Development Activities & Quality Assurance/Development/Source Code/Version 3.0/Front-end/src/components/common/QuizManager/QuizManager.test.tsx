import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizManager } from './QuizManager';

describe('QuizManager', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <QuizManager
        callbackSetQuizStatus={jest.fn()}
        callbackSetQuizState={jest.fn()}
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-manager" })).toBeInTheDocument();
    })
  })
});
