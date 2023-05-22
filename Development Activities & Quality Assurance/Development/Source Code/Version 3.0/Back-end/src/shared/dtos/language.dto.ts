import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { LanguageEnum } from '../enums/language.enum';

export class LanguageRequestDto {
  @ApiProperty({ enum: LanguageEnum })
  @IsEnum(LanguageEnum)
  language: LanguageEnum;
}
