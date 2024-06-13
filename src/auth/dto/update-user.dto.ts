import { IsMongoId, IsNotEmpty } from 'class-validator';
import { UserDataDto } from './user-data.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(UserDataDto) {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;
}
