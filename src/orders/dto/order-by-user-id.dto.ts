import { IsMongoId, IsNotEmpty } from 'class-validator';

export class OrderByUserIdDto {
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;
}
