import { objectToQuery, objectToFormData } from '../../formatAPIParam';
import apiClientJWT from 'src/api/axios/apiClientJWT';

export const apiQuizRecords = {
  storeQuizResult: (data: IParamQuizzes) => {
    const url = 'quizzes';
    return apiClientJWT.post(url, data);
  },

  getQuizzesOfUsers: (firebaseID: string) => {
    const url = `quizzes/users/${firebaseID}`;
    return apiClientJWT.get(url);
  }
};
