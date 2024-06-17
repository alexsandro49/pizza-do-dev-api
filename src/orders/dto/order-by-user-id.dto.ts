import { IsMongoId, IsNotEmpty } from 'class-validator';

export class OrderByUserIdDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly user_id: string;
}
