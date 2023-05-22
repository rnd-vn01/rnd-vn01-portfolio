import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LanguageEnum } from '../../shared/enums/language.enum';

export class GetMeridianRequestDto {
  @ApiProperty({ enum: LanguageEnum })
  @IsEnum(LanguageEnum)
  language: LanguageEnum;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code?: string;
}

export class CreateMeridianRequestDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  diseases: string;

  @ApiProperty()
  @IsString()
  points: string[];
}

export class UpdateMeridianRequestDto extends PartialType(
  CreateMeridianRequestDto,
) {}
