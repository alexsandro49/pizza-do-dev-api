import { UserDataDto } from './user-data.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(UserDataDto) {}
