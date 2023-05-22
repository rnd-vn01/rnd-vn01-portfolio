import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizButton } from './QuizButton';

describe('QuizButton', () => {
  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <QuizButton />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-button" })).toBeInTheDocument();
    })
  })

  it("should callback the click event if button is not disabled", async () => {
    const mockOnClick = jest.fn();

    render(<Provider store={store}>
      <QuizButton
        isDisabled={false}
        onClick={mockOnClick}
      />
    </Provider>)

    const quizButton = screen.getByRole("div", { name: "quiz-button" })
    fireEvent.click(quizButton)

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalled();
    })
  })

  it("should not callback the click event if button is disabled", async () => {
    const mockOnClick = jest.fn();

    render(<Provider store={store}>
      <QuizButton
        isDisabled={true}
        onClick={mockOnClick}
      />
    </Provider>)

    const quizButton = screen.getByRole("div", { name: "quiz-button" })
    fireEvent.click(quizButton)

    await waitFor(() => {
      expect(mockOnClick).not.toHaveBeenCalled();
    })
  })
});
