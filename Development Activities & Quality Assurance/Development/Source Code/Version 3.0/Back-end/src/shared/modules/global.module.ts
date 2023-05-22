import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      // secret: '123',
      // signOptions: {
      //   expiresIn: '20s',
      // },
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRED,
      },
    }),
  ],
  exports: [JwtModule],
})
export class GlobalModule {}
