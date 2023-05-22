import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../shared/services/base.service';
import { MeridiansEntity_vi } from '../entities/meridians-vi.entity';

@Injectable()
export class MeridianService_vi extends BaseService<MeridiansEntity_vi> {
  constructor(
    @InjectModel(MeridiansEntity_vi.name)
    private readonly meridianModel: Model<MeridiansEntity_vi>,
  ) {
    super(meridianModel);
  }
}
