import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty()
  @IsString()
  userFirebaseId: string;

  @ApiProperty()
  @IsNumber()
  numberOfQuestions: number;

  @ApiProperty()
  @IsNumber()
  correctAnswers: number;

  @ApiProperty()
  @IsNumber()
  quizOption: number;

  @ApiProperty()
  @IsArray()
  details: QuestionDetailDto[];

  @ApiProperty()
  @IsString()
  datetime: string;
}

export class QuestionDetailDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsNumber()
  answer: number;

  @ApiProperty()
  @IsNumber()
  correctAnswer: number;

  @ApiProperty()
  @IsNumber()
  time: number;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;

  @ApiProperty()
  @IsArray()
  options: QuestionDetailOptionDto[];
}

export class QuestionDetailOptionDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  answer: string;
}
