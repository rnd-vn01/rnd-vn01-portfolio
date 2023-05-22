import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizQuestion } from './QuizQuestion';

describe('QuizQuestion', () => {
  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <QuizQuestion
        optionsList={[]}
      />
    </Provider>)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-question" })).toBeInTheDocument();
    })
  })

  it("should render the options if passed by param", async () => {
    render(<Provider store={store}>
      <QuizQuestion
        type={0}
        optionsList={[{ answer: "A" }, { answer: "B" }, { answer: "C" }, { answer: "D" }]}
      />
    </Provider>)

    const quizOptions = screen.getAllByRole("quiz-options")

    await waitFor(() => {
      expect(quizOptions.length).toBe(4)
    })
  })

  it("should submit answer if clicked", async () => {
    const mockSubmitAnswer = jest.fn();

    render(<Provider store={store}>
      <QuizQuestion
        type={0}
        optionsList={[{ index: 0, answer: "A" }, { index: 1, answer: "B" },
        { index: 2, answer: "C" }, { index: 3, answer: "D" }]}
        onSubmitAnswer={mockSubmitAnswer}
      />
    </Provider>)

    const quizOptions = screen.getAllByRole("quiz-options")
    fireEvent.click(quizOptions[1])

    await waitFor(() => {
      expect(mockSubmitAnswer).toHaveBeenCalledWith(1)
    })
  })

  it("should submit answer if clicked on Confirmation button for Navigation question", async () => {
    const mockSubmitAnswer = jest.fn();

    render(<Provider store={store}>
      <QuizQuestion
        type={3}
        optionsList={[{ index: 0, answer: "A" }, { index: 1, answer: "B" },
        { index: 2, answer: "C" }, { index: 3, answer: "D" }]}
        onSubmitAnswer={mockSubmitAnswer}
        isShowingAnswer={false}
      />
    </Provider>)

    const quizConfirmation = screen.getByRole("button", { name: "quiz-confirmation" })
    fireEvent.click(quizConfirmation)

    await waitFor(() => {
      expect(mockSubmitAnswer).toHaveBeenCalledWith(0)
    })
  })

  it("should show the correct answer if is in show answer mode", async () => {
    render(<Provider store={store}>
      <QuizQuestion
        type={0}
        optionsList={[{ index: 0, answer: "A" }, { index: 1, answer: "B" },
        { index: 2, answer: "C" }, { index: 3, answer: "D" }]}
        isShowingAnswer={true}
        correctAnswer={2}
      />
    </Provider>)

    const quizOptions = screen.getAllByRole("quiz-options")

    await waitFor(() => {
      expect(quizOptions[2]).toHaveClass("quiz-question__answer--true")
      expect(quizOptions[1]).not.toHaveClass("quiz-question__answer--true")
    })
  })

  it("should not call submit answer if is in showing answer mode", async () => {
    const mockSubmitAnswer = jest.fn();

    render(<Provider store={store}>
      <QuizQuestion
        type={0}
        optionsList={[{ index: 0, answer: "A" }, { index: 1, answer: "B" },
        { index: 2, answer: "C" }, { index: 3, answer: "D" }]}
        isShowingAnswer={true}
        correctAnswer={2}
        onSubmitAnswer={mockSubmitAnswer}
      />
    </Provider>)

    const quizOptions = screen.getAllByRole("quiz-options")
    fireEvent.click(quizOptions[1])

    await waitFor(() => {
      expect(mockSubmitAnswer).not.toHaveBeenCalled()
    })
  })

  it("should not call submit answer if confirm for navigate question if is in showing answer mode", async () => {
    const mockSubmitAnswer = jest.fn();

    render(<Provider store={store}>
      <QuizQuestion
        type={3}
        optionsList={[{ index: 0, answer: "A" }, { index: 1, answer: "B" },
        { index: 2, answer: "C" }, { index: 3, answer: "D" }]}
        isShowingAnswer={true}
        correctAnswer={2}
        onSubmitAnswer={mockSubmitAnswer}
      />
    </Provider>)

    const quizConfirmation = screen.getByRole("button", { name: "quiz-confirmation" })
    fireEvent.click(quizConfirmation)

    await waitFor(() => {
      expect(mockSubmitAnswer).not.toHaveBeenCalled()
    })
  })

  it("should show the selected answer as wrong if wrongly submitted", async () => {
    render(<Provider store={store}>
      <QuizQuestion
        type={0}
        optionsList={[{ index: 0, answer: "A" }, { index: 1, answer: "B" },
        { index: 2, answer: "C" }, { index: 3, answer: "D" }]}
        isShowingAnswer={true}
        correctAnswer={2}
        selectedAnswer={1}
      />
    </Provider>)

    const quizOptions = screen.getAllByRole("quiz-options")

    await waitFor(() => {
      expect(quizOptions[1]).toHaveClass("quiz-question__answer--false")
    })
  })

  it("should show the name of points only if question is of type choose from location", async () => {
    render(<Provider store={store}>
      <QuizQuestion
        type={2}
        optionsList={[{ index: 0, answer: "A (1)" }, { index: 1, answer: "B (2)" },
        { index: 2, answer: "C (3)" }, { index: 3, answer: "D (4)" }]}
        isShowingAnswer={false}
      />
    </Provider>)

    const quizOptions = screen.getAllByRole("quiz-options")
    quizOptions.forEach((option, index) => {
      expect(option.innerHTML).toBe((index + 1).toString())
    })
  })

  it("should show point index only if the question is of type identify correct location", async () => {
    render(<Provider store={store}>
      <QuizQuestion
        type={4}
        optionsList={[{ index: 0, answer: "A (1)" }, { index: 1, answer: "B (2)" },
        { index: 2, answer: "C (3)" }, { index: 3, answer: "D (4)" }]}
        isShowingAnswer={false}
      />
    </Provider>)

    const quizOptions = screen.getAllByRole("quiz-options")
    quizOptions.forEach((option, index) => {
      expect(option.innerHTML).toBe(`P${index + 1}`)
    })
  })
});
