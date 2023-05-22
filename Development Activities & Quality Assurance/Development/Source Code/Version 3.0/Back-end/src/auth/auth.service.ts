import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dtos/user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { JwtPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(firebase_id: string): Promise<UserEntity> {
    const user = await this.usersService.findOne({ firebase_id: firebase_id });

    return user ?? null;
  }

  async generateJWT(firebase_id: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(firebase_id);
    if (!user) {
      throw new UnauthorizedException('NotFoundUser');
    }
    return this._generateJWT(user);
  }

  private _generateJWT(user: JwtPayload): { access_token: string } {
    const payload = {
      name: user.name,
      firebase_Id: user.firebase_id,
      roles: user.roles,
    };
    console.log(`Generated JWT token with payload ${JSON.stringify(payload)}`);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
