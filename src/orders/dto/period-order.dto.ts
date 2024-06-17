import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class PeriodOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly user_id: string;

  @IsDate()
  @IsNotEmpty()
  readonly startDate: Date;

  @IsDate()
  @IsNotEmpty()
  readonly endDate: Date;
}
