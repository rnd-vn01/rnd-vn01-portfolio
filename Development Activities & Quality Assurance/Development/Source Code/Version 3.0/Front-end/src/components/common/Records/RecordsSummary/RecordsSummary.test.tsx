import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecordsSummary } from './RecordsSummary';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { SAMPLE_QUIZ_LIST } from '../tests/quizList';

describe('RecordsSummary', () => {
  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2023-04-08'));

    render(<Provider store={store}>
      <RecordsSummary
        data={SAMPLE_QUIZ_LIST}
      />
    </Provider>)
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "records-summary" })).toBeInTheDocument();
    })
  })

  it("should update showing type this_year option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsSummary
        data={SAMPLE_QUIZ_LIST}
      />
    </Provider>)

    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 1 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[1].innerHTML).toBe(`20`)
      expect(recordsSummaryMeridians[1].innerHTML).toBe(`7`)
      expect(recordsSummaryQuizzes[1].innerHTML).toBe(`3`)
      expect(recordsSummaryAccuracy[1].innerHTML).toBe(`33%`)
    })
  })

  it("should update showing type this_month option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsSummary
        data={SAMPLE_QUIZ_LIST}
      />
    </Provider>)

    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 2 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[1].innerHTML).toBe(`20`)
      expect(recordsSummaryMeridians[1].innerHTML).toBe(`7`)
      expect(recordsSummaryQuizzes[1].innerHTML).toBe(`3`)
      expect(recordsSummaryAccuracy[1].innerHTML).toBe(`33%`)
    })
  })

  it("should update showing type this_week option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsSummary
        data={SAMPLE_QUIZ_LIST}
      />
    </Provider>)

    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 3 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[1].innerHTML).toBe(`20`)
      expect(recordsSummaryMeridians[1].innerHTML).toBe(`7`)
      expect(recordsSummaryQuizzes[1].innerHTML).toBe(`3`)
      expect(recordsSummaryAccuracy[1].innerHTML).toBe(`33%`)
    })
  })
});
