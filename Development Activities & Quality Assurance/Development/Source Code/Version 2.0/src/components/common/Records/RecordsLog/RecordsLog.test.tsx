import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecordsLog } from './RecordsLog';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

const DEMO_LOG = {
  "date": "2023-03-07T09:08:30.433Z",
  "result": {
    "numberOfQuestions": 5,
    "correctAnswers": 1,
    "correctPoints": [
      {
        "code": "ST-4",
        "name": "Dicang",
        "meridian": "ST",
        "isCorrect": true
      }
    ],
    "wrongPoints": [
      {
        "code": "Ren-6",
        "name": "Qihai",
        "meridian": "Ren",
        "isCorrect": false
      },
      {
        "code": "BL-41",
        "name": "Fufen",
        "meridian": "BL",
        "isCorrect": false
      },
      {
        "code": "TE-10",
        "name": "Tianjing",
        "meridian": "TE",
        "isCorrect": false
      },
      {
        "code": "BL-51",
        "name": "Huangmen",
        "meridian": "BL",
        "isCorrect": false
      }
    ]
  }
}

describe('RecordsLog', () => {
  it("to be rendered successfully", async () => {
    render(<RecordsLog
      logData={DEMO_LOG}
      index={0}
    />)

    await waitFor(() => {
      expect(screen.getByRole("div", { name: "records-log" })).toBeInTheDocument();
    })
  })
});
