import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../shared/services/base.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {
    super(userModel);
  }
}
