import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
