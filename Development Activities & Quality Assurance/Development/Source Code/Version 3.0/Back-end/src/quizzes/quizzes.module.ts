import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzesEntity, QuizzesSchema } from './entities/quizzes.entity';

const providers = [QuizzesService];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizzesEntity.name, schema: QuizzesSchema },
    ]),
  ],
  controllers: [QuizzesController],
  providers: providers,
  exports: providers,
})
export class QuizzesModule {}
