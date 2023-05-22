interface IParamUpdateAcupuncturePoint extends IAcupuncturePoint { }
interface IParamUpdateMeridian {
  code: string;
  name: string;
  description: string;
  diseases: string;
  points?: Array<string>
}

interface IParamCreateUpdateAccount {
  firebase_id: string;
  email: string;
  image: string;
  name: string;
  roles?: Array<string>
}

interface IQuestionDetailOption {
  id: number;
  answer: string;
}

interface IQuestionDetailOption2 {
  index: number;
  answer: string;
}

interface IQuizDetail {
  question: string;
  answer: number | string;
  correctAnswer: number | string;
  time: number;
  isCorrect: boolean;
  options: Array<IQuestionDetailOption> | Array<IQuestionDetailOption2>;
}

interface IParamQuizzes {
  userFirebaseId: string;
  numberOfQuestions: number;
  correctAnswers: number;
  quizOption: number;
  details: Array<IQuizDetail>;
  datetime: string;
}
