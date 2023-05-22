import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecordsSummary } from './RecordsSummary';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

const DEMO_RECORDS_SUMMARY = {
  0: {
    points: 215,
    meridians: 11,
    quizzes: 52,
    accuracy: 76
  },
  1: {
    points: 150,
    meridians: 9,
    quizzes: 40,
    accuracy: 80
  },
  2: {
    points: 15,
    meridians: 2,
    quizzes: 5,
    accuracy: 68
  },
  3: {
    points: 2,
    meridians: 1,
    quizzes: 2,
    accuracy: 79
  }
}

describe('RecordsSummary', () => {
  beforeEach(() => {
    render(<Provider store={store}>
      <RecordsSummary />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "records-summary" })).toBeInTheDocument();
    })
  })

  it("should update showing type this_year option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsSummary />
    </Provider>)

    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 1 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[1].points}`)
      expect(recordsSummaryMeridians[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[1].meridians}`)
      expect(recordsSummaryQuizzes[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[1].quizzes}`)
      expect(recordsSummaryAccuracy[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[1].accuracy}%`)
    })
  })

  it("should update showing type this_month option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsSummary />
    </Provider>)

    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 2 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[2].points}`)
      expect(recordsSummaryMeridians[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[2].meridians}`)
      expect(recordsSummaryQuizzes[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[2].quizzes}`)
      expect(recordsSummaryAccuracy[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[2].accuracy}%`)
    })
  })

  it("should update showing type this_week option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsSummary />
    </Provider>)

    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 3 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[3].points}`)
      expect(recordsSummaryMeridians[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[3].meridians}`)
      expect(recordsSummaryQuizzes[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[3].quizzes}`)
      expect(recordsSummaryAccuracy[0].innerHTML).toBe(`${DEMO_RECORDS_SUMMARY[3].accuracy}%`)
    })
  })
});
