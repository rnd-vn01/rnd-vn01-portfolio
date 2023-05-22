import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '../../shared/entities/base.entity';

@Schema({ collection: 'quizzes', timestamps: true })
export class QuizzesEntity extends BaseEntity {
  @Prop()
  userFirebaseId: string;

  @Prop()
  numberOfQuestions: number;

  @Prop()
  correctAnswers: number;

  @Prop()
  quizOption: number;

  @Prop()
  details: IQuestionDetail[];

  @Prop()
  datetime: string;
}

export interface IQuestionDetail {
  question: string;
  answer: number | string;
  correctAnswer: number | string;
  time: number;
  isCorrect: boolean;
  options: IQuestionDetailOption[];
}

export interface IQuestionDetailOption {
  id: number;
  answer: string;
}

export const QuizzesSchema = SchemaFactory.createForClass(QuizzesEntity);
