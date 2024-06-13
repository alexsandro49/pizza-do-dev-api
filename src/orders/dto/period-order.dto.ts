import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class PeriodOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;
}
