import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRoleEnum } from '../enums/user-role.enum';

export class GetUserRequestDto {}

export class CreateUserRequestDto {
  @ApiProperty()
  @IsString()
  firebase_id: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsEnum(UserRoleEnum, { each: true })
  roles: UserRoleEnum[];
}

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {}
