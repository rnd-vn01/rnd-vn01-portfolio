import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../shared/services/base.service';
import { AcupointsEntity_vi } from '../entities/acupoint-vi.entity';

@Injectable()
export class AcupointService_vi extends BaseService<AcupointsEntity_vi> {
  constructor(
    @InjectModel(AcupointsEntity_vi.name)
    private readonly acupointModel: Model<AcupointsEntity_vi>,
  ) {
    super(acupointModel);
  }
}
