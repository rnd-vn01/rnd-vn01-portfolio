import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateQuizDto } from './dto/create-quiz.request.dto';
import { QuizzesEntity } from './entities/quizzes.entity';
import { QuizzesService } from './quizzes.service';

@ApiTags('Quizzes')
@Controller('quizzes')
@UseGuards(AuthGuard)
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto): Promise<QuizzesEntity> {
    return await this.quizzesService.create(createQuizDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<QuizzesEntity> {
    return await this.quizzesService.findOne({ _id: id });
  }

  @Get('users/:firebase_id')
  async findAllByUserFirebaseId(
    @Param('firebase_id') firebaseId: string,
  ): Promise<QuizzesEntity[]> {
    const quizzes = await this.quizzesService.find({
      userFirebaseId: firebaseId,
    });
    return quizzes;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
}
