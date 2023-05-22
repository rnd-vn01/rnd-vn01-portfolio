import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '../../shared/entities/base.entity';
import { UserRoleEnum } from '../enums/user-role.enum';

@Schema({ collection: 'Users', timestamps: true })
export class UserEntity extends BaseEntity {
  @Prop()
  firebase_id: string;

  @Prop()
  email: string;

  @Prop()
  image: string;

  @Prop()
  name: string;

  @Prop()
  roles: UserRoleEnum[];
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
