import { IQuestionDetail } from '../entities/quizzes.entity';

export class CreateQuizDto {
  userFirebaseId: string;
  numberOfQuestions: number;
  correctAnswers: number;
  quizOption: number;
  details: IQuestionDetail[];
  datetime: string;
}
