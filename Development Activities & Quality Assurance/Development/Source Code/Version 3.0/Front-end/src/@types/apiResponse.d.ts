interface IParamGetAccountInfo {
  _id?: string;
  firebase_id?: string;
  email?: string;
  image?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number
}

interface IFormattedQuizDetail {
  userFirebaseId?: string;
  numberOfQuestions?: number;
  correctAnswers?: number;
  quizOption?: number;
  datetime?: Date;
  details?: Array<IQuizDetail>;
}
