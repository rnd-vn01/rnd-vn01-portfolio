import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecordsProgressLog } from './RecordsProgressLog';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import { resetToInitialStateLanguageSlice, setStateLanguage } from 'src/redux/slice';
import { SAMPLE_QUIZ_LIST } from '../tests/quizList';

describe('RecordsProgressLog', () => {
  afterEach(() => {
    store.dispatch(resetToInitialStateLanguageSlice())
  })

  it("to be rendered successfully", async () => {
    render(<Provider store={store}>
      <RecordsProgressLog
        quizzesList={SAMPLE_QUIZ_LIST}
      />
    </Provider>)
    await waitFor(() => {
      expect(screen.getByRole("div", { name: "records-progress" })).toBeInTheDocument();
    })
  })

  it("should update showing type this_year option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsProgressLog
        quizzesList={SAMPLE_QUIZ_LIST}
      />
    </Provider>)

    // Change to log mode
    fireEvent.click(screen.getByRole("h1", { name: "title-log" }))
    const recordsProgressSelect = screen.getByRole("select", { name: "records-progress-select" })
    fireEvent.change(recordsProgressSelect, { target: { value: 1 } })

    await waitFor(() => {
      expect((recordsProgressSelect as any).value).toBe("1")
    })
  })

  it("should update showing type this_month option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsProgressLog
        quizzesList={SAMPLE_QUIZ_LIST}
      />
    </Provider>)

    // Change to log mode
    fireEvent.click(screen.getByRole("h1", { name: "title-log" }))
    const recordsProgressSelect = screen.getByRole("select", { name: "records-progress-select" })
    fireEvent.change(recordsProgressSelect, { target: { value: 2 } })

    await waitFor(() => {
      expect((recordsProgressSelect as any).value).toBe("2")
    })
  })

  it("should update showing type this_week option if changed from select", async () => {
    render(<Provider store={store}>
      <RecordsProgressLog
        quizzesList={SAMPLE_QUIZ_LIST}
      />
    </Provider>)

    // Change to log mode
    fireEvent.click(screen.getByRole("h1", { name: "title-log" }))
    const recordsProgressSelect = screen.getByRole("select", { name: "records-progress-select" })
    fireEvent.change(recordsProgressSelect, { target: { value: 3 } })

    await waitFor(() => {
      expect((recordsProgressSelect as any).value).toBe("3")
    })
  })

  it("should change back to is progress if is in log mode and click back to progress", async () => {
    render(<Provider store={store}>
      <RecordsProgressLog
        quizzesList={SAMPLE_QUIZ_LIST}
      />
    </Provider>)

    // Change to log mode
    fireEvent.click(screen.getByRole("h1", { name: "title-log" }))
    fireEvent.click(screen.getByRole("h1", { name: "title-progress" }))

    await waitFor(() => {
      expect(screen.queryByText("records-progress-select")).toBeNull()
    })
  })

  it("should behave as expected for in progress mode and Vietnamese language", async () => {
    store.dispatch(setStateLanguage({
      currentLanguage: "VI"
    }))

    render(<Provider store={store}>
      <RecordsProgressLog
        quizzesList={SAMPLE_QUIZ_LIST}
      />
    </Provider>)
  })
});
