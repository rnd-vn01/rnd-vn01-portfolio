import { PartialType } from '@nestjs/swagger';
import { CreateQuizDto } from './create-quiz.request.dto';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {}
