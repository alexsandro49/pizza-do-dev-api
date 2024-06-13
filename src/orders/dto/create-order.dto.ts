import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  user_id: ObjectId;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsArray()
  @Type(() => ProductDto)
  products: [ProductDto];

  @IsArray()
  @Type(() => ProductDto)
  side_dishes: [{ _id: string; amount: number }];

  @IsBoolean()
  @IsNotEmpty()
  deliver: boolean;

  @IsNumber()
  adress: number;

  @IsNumber()
  @IsNotEmpty()
  total_cust: number;
}

class ProductDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: string;
}
