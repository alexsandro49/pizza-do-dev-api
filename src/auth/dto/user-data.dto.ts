import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { gender } from '../enum/gender.enum';
import { AuthUserDto } from './auth-user.dto';
import { Type } from 'class-transformer';

export class UserDataDto extends AuthUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly cpf: string;

  @IsString()
  @IsNotEmpty()
  readonly dob: string;

  @IsEnum(gender)
  readonly gender: gender;

  @IsString()
  @IsNotEmpty()
  readonly tel: string;

  @IsArray()
  @Type(() => adressDto)
  readonly adresses: [adressDto];
}

class adressDto {
  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsString()
  @IsNotEmpty()
  readonly neighborhood: string;

  @IsInt()
  readonly number: number;
}
