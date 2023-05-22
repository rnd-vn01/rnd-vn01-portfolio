import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AcupointModule } from './accupuncture-points/acupoint.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MeridianModule } from './meridians/meridian.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { GlobalModule } from './shared/modules/global.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_DB,
      // 'mongodb+srv://rnd-cycle13-vn01:OHgzUYdcgK4WVORu@cluster0.bqu0t0p.mongodb.net/rnd-cycle13-vn01?retryWrites=true&w=majority',
    ),
    GlobalModule,
    UserModule,
    AuthModule,
    AcupointModule,
    MeridianModule,
    QuizzesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
