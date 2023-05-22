import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../shared/services/base.service';
import { AcupointsEntity_en } from '../entities/acupoint-en.entity';

@Injectable()
export class AcupointService_en extends BaseService<AcupointsEntity_en> {
  constructor(
    @InjectModel(AcupointsEntity_en.name)
    private readonly acupointModel: Model<AcupointsEntity_en>,
  ) {
    super(acupointModel);
  }
}
