import { SAMPLE_QUIZ_LIST } from "src/components/common/Records/tests/quizList"
import { calculateDateStreak, getLogsForChart, getSummary } from "src/helpers/statistics";

test("getLogsForChart", () => {
  const results = getLogsForChart(SAMPLE_QUIZ_LIST, 0);

  results.forEach((result) => {
    expect(Object.keys(result.result)).toContain("points")
  })
})

describe("calculateDateStreak", () => {
  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2022-04-08'));
  })

  it("case streak ended today", async () => {
    const QUIZZES_LIST = [{
      datetime: new Date(2022, 3, 8)
    }, {
      datetime: new Date(2022, 3, 7)
    }, {
      datetime: new Date(2022, 3, 6)
    }, {
      datetime: new Date(2022, 3, 5)
    }, {
      datetime: new Date(2022, 3, 3)
    }, {
      datetime: new Date(2022, 3, 2)
    }, {
      datetime: new Date(2022, 3, 1)
    }]

    expect(calculateDateStreak(QUIZZES_LIST as any)).toBe(4)
  })

  it("case streak ended yesterday", async () => {
    const QUIZZES_LIST = [{
      datetime: new Date(2022, 3, 7)
    }, {
      datetime: new Date(2022, 3, 6)
    }, {
      datetime: new Date(2022, 3, 5)
    }, {
      datetime: new Date(2022, 3, 4)
    }, {
      datetime: new Date(2022, 3, 3)
    }, {
      datetime: new Date(2022, 2, 31)
    }, {
      datetime: new Date(2022, 2, 29)
    }]

    expect(calculateDateStreak(QUIZZES_LIST as any)).toBe(5)
  })

  it("case streak existed but ended the day before yesterday", async () => {
    const QUIZZES_LIST = [{
      datetime: new Date(2022, 3, 6)
    }, {
      datetime: new Date(2022, 3, 5)
    }, {
      datetime: new Date(2022, 3, 4)
    }, {
      datetime: new Date(2022, 3, 2)
    }]

    expect(calculateDateStreak(QUIZZES_LIST as any)).toBe(0)
  })

  it("case yesterday attempted but only a single day, not formed a streak", async () => {
    const QUIZZES_LIST = [{
      datetime: new Date(2022, 3, 7)
    }, {
      datetime: new Date(2022, 3, 5)
    }, {
      datetime: new Date(2022, 3, 4)
    }, {
      datetime: new Date(2022, 3, 3)
    }]

    expect(calculateDateStreak(QUIZZES_LIST as any)).toBe(0)
  })
})

test("quizSummary for empty quizzes", () => {
  jest
    .useFakeTimers()
    .setSystemTime(new Date('2023-04-11'));

  const results = getSummary(SAMPLE_QUIZ_LIST, 3);

  expect(results.accuracy).toBe(0);
})
