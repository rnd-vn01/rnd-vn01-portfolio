import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { MeridiansEntity_en } from './meridians-en.entity';

@Schema({ collection: 'meridians_vi', timestamps: true })
export class MeridiansEntity_vi extends MeridiansEntity_en {}

export const MeridiansSchema_vi =
  SchemaFactory.createForClass(MeridiansEntity_vi);
