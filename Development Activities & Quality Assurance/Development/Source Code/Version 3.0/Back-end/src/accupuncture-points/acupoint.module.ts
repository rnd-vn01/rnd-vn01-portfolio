import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcupointController } from './acupoint.controller';
import {
  AcupointsEntity_en,
  AcupointsSchema_en,
} from './entities/acupoint-en.entity';
import {
  AcupointsEntity_vi,
  AcupointsSchema_vi,
} from './entities/acupoint-vi.entity';
import { AcupointService_en } from './services/acupoint-en.service';
import { AcupointService_vi } from './services/acupoint-vi.service';

const providers = [AcupointService_en, AcupointService_vi];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AcupointsEntity_en.name, schema: AcupointsSchema_en },
    ]),
    MongooseModule.forFeature([
      { name: AcupointsEntity_vi.name, schema: AcupointsSchema_vi },
    ]),
  ],
  controllers: [AcupointController],
  providers: providers,
  exports: providers,
})
export class AcupointModule { }
