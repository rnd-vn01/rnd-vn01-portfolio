import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { QuizSummary } from './QuizSummary';

const DEMO_QUIZ_SUMMARY = {
  options: {
    numberOfQuestions: 3,
    field: [{
      caption: "Test Field"
    }]
  },
  questions: [{
    correctAnswer: 1,
    answer: 1,
    options: [{
      index: 0,
      answer: "A"
    }, {
      index: 1,
      answer: "B"
    }],
    time: 20
  }, {
    correctAnswer: 0,
    answer: 1,
    options: [{
      index: 0,
      answer: "C"
    }, {
      index: 1,
      answer: "D"
    }],
    time: -1
  }, {
    correctAnswer: "F",
    answer: "F",
    options: [{
      index: 0,
      answer: "E (0)"
    }, {
      index: 1,
      answer: "F (1)"
    }],
    time: -1
  }]
}

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
    location: {
      pathname: []
    }
  }),
  useLocation: () => ({
    pathname: '',
    search: ''
  })
}));

describe('QuizSummary', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <QuizSummary
        data={DEMO_QUIZ_SUMMARY}
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "quiz-summary" })).toBeInTheDocument();
    })
  })

  it("should navigate to records page if clicking on View personal records button", async () => {
    fireEvent.click(screen.getByRole("p", { name: "view-personal-records" }))

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith("/records")
    })
  })
});
