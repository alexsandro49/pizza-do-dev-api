import { IsString, IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';

export class ProductDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;

  @IsString()
  readonly comments: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  readonly category: number;
}
