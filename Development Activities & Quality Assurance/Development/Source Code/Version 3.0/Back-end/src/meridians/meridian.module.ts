import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MeridiansEntity_en,
  MeridiansSchema_en,
} from './entities/meridians-en.entity';
import {
  MeridiansEntity_vi,
  MeridiansSchema_vi,
} from './entities/meridians-vi.entity';
import { MeridianController } from './meridian.controller';
import { MeridianService_en } from './services/meridians-en.service';
import { MeridianService_vi } from './services/meridians-vi.service';

const providers = [MeridianService_en, MeridianService_vi];

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: MeridiansEntity_en.name, schema: MeridiansSchema_en },
    ]),
    MongooseModule.forFeature([
      { name: MeridiansEntity_vi.name, schema: MeridiansSchema_vi },
    ]),
  ],
  controllers: [MeridianController],
  providers: providers,
  exports: providers,
})
export class MeridianModule {}
