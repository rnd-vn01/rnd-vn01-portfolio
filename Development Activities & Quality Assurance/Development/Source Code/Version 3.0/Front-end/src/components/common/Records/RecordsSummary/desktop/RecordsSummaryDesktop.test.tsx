import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecordsSummaryDesktop } from './RecordsSummaryDesktop';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { Context as ResponsiveContext } from "react-responsive";
import { resetToInitialStateLanguageSlice, setStateLanguage } from 'src/redux/slice';
import { SAMPLE_QUIZ_LIST } from '../../tests/quizList';

describe('RecordsSummaryDesktop', () => {
  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2023-04-08'));

    jest
      .useFakeTimers()
      .setSystemTime(new Date('2023-04-08'));

    render(<ResponsiveContext.Provider value={{ width: 1200 }}>
      <Provider store={store}>
        <RecordsSummaryDesktop
          data={SAMPLE_QUIZ_LIST}
        />
      </Provider>
    </ResponsiveContext.Provider>)

    store.dispatch(setStateLanguage({
      currentLanguage: "EN"
    }))
  })

  afterEach(() => {
    store.dispatch(resetToInitialStateLanguageSlice());
  })

  it("to be rendered successfully", async () => {
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "records-summary-desktop" })).toBeInTheDocument();
    })
  })

  it("should update showing type this_year option if changed from select", async () => {
    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-desktop-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 1 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[0].innerHTML).toBe(`20`)
      expect(recordsSummaryMeridians[0].innerHTML).toBe(`7`)
      expect(recordsSummaryQuizzes[0].innerHTML).toBe(`3`)
      expect(recordsSummaryAccuracy[0].innerHTML).toBe(`33%`)
    })
  })

  it("should update showing type this_month option if changed from select", async () => {
    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-desktop-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 2 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[0].innerHTML).toBe(`20`)
      expect(recordsSummaryMeridians[0].innerHTML).toBe(`7`)
      expect(recordsSummaryQuizzes[0].innerHTML).toBe(`3`)
      expect(recordsSummaryAccuracy[0].innerHTML).toBe(`33%`)
    })
  })

  it("should update showing type this_week option if changed from select", async () => {
    const recordsSummaryTypeSelect = screen.getAllByRole("select", { name: "records-summary-desktop-type-select" })
    fireEvent.change(recordsSummaryTypeSelect[0], { target: { value: 3 } })

    await waitFor(() => {
      const recordsSummaryPoints = screen.getAllByTestId("record-summary-points")
      const recordsSummaryMeridians = screen.getAllByTestId("record-summary-meridians")
      const recordsSummaryQuizzes = screen.getAllByTestId("record-summary-quizzes")
      const recordsSummaryAccuracy = screen.getAllByTestId("record-summary-accuracy")

      expect(recordsSummaryPoints[0].innerHTML).toBe(`20`)
      expect(recordsSummaryMeridians[0].innerHTML).toBe(`7`)
      expect(recordsSummaryQuizzes[0].innerHTML).toBe(`3`)
      expect(recordsSummaryAccuracy[0].innerHTML).toBe(`33%`)
    })
  })

  it("should render as expected inside the summary box if language is set to be Vietnamese", async () => {
    store.dispatch(setStateLanguage({
      currentLanguage: "VI"
    }))

    await waitFor(() => {
      expect(screen.getAllByTestId("h3-quizzes-attempts").length).toBe(2)
    })
  })
});
