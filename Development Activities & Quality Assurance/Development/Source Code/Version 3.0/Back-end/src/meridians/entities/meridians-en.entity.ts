import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '../../shared/entities/base.entity';

@Schema({ collection: 'meridians_en', timestamps: true })
export class MeridiansEntity_en extends BaseEntity {
  @Prop()
  code: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  diseases: string;
  @Prop()
  points: string[];
}

export const MeridiansSchema_en =
  SchemaFactory.createForClass(MeridiansEntity_en);
