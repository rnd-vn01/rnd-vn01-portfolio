import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AcupointsEntity_en } from './acupoint-en.entity';

@Schema({ collection: 'acupoints_vi', timestamps: true })
export class AcupointsEntity_vi extends AcupointsEntity_en {}

export const AcupointsSchema_vi =
  SchemaFactory.createForClass(AcupointsEntity_vi);
