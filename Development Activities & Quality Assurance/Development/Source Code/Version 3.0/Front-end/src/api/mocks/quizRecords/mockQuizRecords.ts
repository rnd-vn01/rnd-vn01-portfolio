import MockAdapter from 'axios-mock-adapter';
import apiClientJWT from 'src/api/axios/apiClientJWT';

export const EXAMPLE_QUIZ_RESULT = {
  userFirebaseId: "VALID",
  numberOfQuestions: 3,
  correctAnswers: 2,
  quizOption: 1,
  datetime: "2023-04-06T17:19:05.147Z",
  details: [{
    question: "Quest 1",
    isCorrect: true,
    correctAnswer: 1,
    answer: 1,
    options: [{
      id: 0,
      answer: "A"
    }, {
      id: 1,
      answer: "B"
    }],
    time: 20
  }, {
    question: "Quest 2",
    isCorrect: false,
    correctAnswer: 0,
    answer: 1,
    options: [{
      id: 0,
      answer: "C"
    }, {
      id: 1,
      answer: "D"
    }],
    time: -1
  }, {
    question: "Quest 3",
    isCorrect: true,
    correctAnswer: "F",
    answer: "F",
    options: [{
      id: 0,
      answer: "E (0)"
    }, {
      id: 1,
      answer: "F (1)"
    }],
    time: -1
  }]
}

export const mockQuizRecords = () => {
  const mockJWT = new MockAdapter(apiClientJWT as any)
  let pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}quizzes\/users\/`);

  mockJWT.onGet(pathRegex)
    .reply((config: any) => {
      let getParams = config.url.split("/")
      let firebaseID = getParams[getParams.length - 1]

      if (firebaseID === "INVALID") {
        return ([200, []]);
      } else {
        return ([200, [EXAMPLE_QUIZ_RESULT]]);
      }
    })

  pathRegex = new RegExp(`${process.env.REACT_APP_API_ENDPOINT}quizzes`);

  mockJWT.onPost(pathRegex)
    .reply((config: any) => {
      return ([200, EXAMPLE_QUIZ_RESULT])
    })
}
