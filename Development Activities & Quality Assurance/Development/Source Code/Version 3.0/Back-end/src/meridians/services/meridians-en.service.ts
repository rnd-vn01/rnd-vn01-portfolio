import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../shared/services/base.service';
import { MeridiansEntity_en } from '../entities/meridians-en.entity';

@Injectable()
export class MeridianService_en extends BaseService<MeridiansEntity_en> {
  constructor(
    @InjectModel(MeridiansEntity_en.name)
    private readonly meridianModel: Model<MeridiansEntity_en>,
  ) {
    super(meridianModel);
  }
}
