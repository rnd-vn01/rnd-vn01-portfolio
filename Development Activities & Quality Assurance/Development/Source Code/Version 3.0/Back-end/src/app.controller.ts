import { Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { Public } from './common/decorators/public.decorator';

@ApiTags('authentication')
@Controller()
@Public()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Req() req): Promise<{ access_token: string }> {
    const { firebase_id } = req.body;

    return await this.authService.generateJWT(firebase_id);
  }
}
