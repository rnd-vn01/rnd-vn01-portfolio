import { getQuizzesOfUsers, storeQuizResult } from "src/helpers/api/quizRecords";
import { EXAMPLE_QUIZ_RESULT, mockQuizRecords } from "../mocks/quizRecords/mockQuizRecords"
import moment from "moment";

describe("apiQuizRecords", () => {
  beforeAll(() => {
    mockQuizRecords();
  })

  describe("get quizzes of users", () => {
    it("should return list of quizzes if firebaseId is VALID", async () => {
      const result = await getQuizzesOfUsers("VALID")
      expect(result.length).toBe(1)
      expect(result[0]).toStrictEqual({
        ...EXAMPLE_QUIZ_RESULT,
        datetime: moment(EXAMPLE_QUIZ_RESULT.datetime).toDate()
      })
    })

    it("should return empty list of quizzes if firebaseId is INVALID", async () => {
      const result = await getQuizzesOfUsers("INVALID")
      expect(result.length).toBe(0)
    })
  })

  describe("store quizzes result", () => {
    it("should store the quiz result successfully", async () => {
      const result = await storeQuizResult(EXAMPLE_QUIZ_RESULT)
      expect(result).toStrictEqual(EXAMPLE_QUIZ_RESULT)
    })
  })
})
