import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizOptions } from './QuizOptions';

describe('QuizOptions', () => {
  const mockSetField = jest.fn();
  const mockSetNumberOfQuestions = jest.fn();

  beforeEach(() => {
    render(<Provider store={store}>
      <QuizOptions
        fieldOptionsList={[
          {
            value: 0,
            caption: "Field 1"
          },
          {
            value: 1,
            caption: "Field 2"
          }
        ]}
        numberOfQuestionsOptionsList={[5, 10, 15]}
        setField={mockSetField}
        setNumberOfQuestion={mockSetNumberOfQuestions}
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-options" })).toBeInTheDocument();
    })
  })

  it("should update the selecte field if chosen from the select", async () => {
    const quizFieldSelect = screen.getByRole("select", { name: "quiz-field-select" })
    fireEvent.change(quizFieldSelect, { target: { value: 1 } })

    await waitFor(() => {
      expect(mockSetField).toHaveBeenCalledWith("1")
    })
  })

  it("should update the number of questions if chosen from the list", async () => {
    const quizNumberOfQuestionsSelect = screen.getByRole("select", { name: "quiz-number-of-quests-select" })
    fireEvent.change(quizNumberOfQuestionsSelect, { target: { value: 10 } })

    await waitFor(() => {
      expect(mockSetNumberOfQuestions).toHaveBeenCalledWith(10)
    })
  })
});
