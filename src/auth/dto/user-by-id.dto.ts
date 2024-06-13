import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UserByIdDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;
}
