import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../shared/services/base.service';
import { QuizzesEntity } from './entities/quizzes.entity';

@Injectable()
export class QuizzesService extends BaseService<QuizzesEntity> {
  constructor(
    @InjectModel(QuizzesEntity.name)
    private readonly _quizzesModel: Model<QuizzesEntity>,
  ) {
    super(_quizzesModel);
  }
}
