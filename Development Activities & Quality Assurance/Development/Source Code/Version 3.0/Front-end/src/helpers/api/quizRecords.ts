import moment from "moment"
import { apiQuizRecords } from "src/api/endpoints/apiQuizRecords/apiQuizRecords"
const EXCLUDE_FIELDS = ["_id", "createdAt", "updatedAt", "__v"]

export const storeQuizResult = async (data: IParamQuizzes) => {
  let storeResult = await apiQuizRecords.storeQuizResult(data)
  return (storeResult as any).data
}

export const getQuizzesOfUsers = async (firebaseID: string) => {
  let quizzes = await apiQuizRecords.getQuizzesOfUsers(firebaseID)
  let getQuizzes = quizzes?.data;

  //Update time zone
  getQuizzes.forEach(quiz => {
    quiz.datetime = moment(quiz.datetime).toDate()

    EXCLUDE_FIELDS.forEach(field => {
      delete quiz[field]
    })
  })

  return getQuizzes
}
