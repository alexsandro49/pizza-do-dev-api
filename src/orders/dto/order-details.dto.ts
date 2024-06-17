import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsMongoId,
  IsObject,
} from 'class-validator';
import { ProductDto } from 'src/products/dto/product.dto';

export class OrderDetailsDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly cpf: string;

  @IsArray()
  @Type(() => ProductDetailsDto)
  readonly products: ProductDetailsDto[];

  @IsArray()
  @Type(() => ProductDetailsDto)
  readonly side_dishes: ProductDetailsDto[];

  @IsNumber()
  @IsNotEmpty()
  readonly deliver: number;

  @IsObject()
  @IsNotEmpty()
  readonly adress: AdressDto;

  @IsNumber()
  @IsNotEmpty()
  readonly total_cust: number;
}

export class ProductDetailsDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  readonly description: string;

  @IsString()
  readonly comments: string;

  @IsNumber()
  readonly amount: number;
}

class AdressDto {
  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsString()
  @IsNotEmpty()
  readonly neighborhood: string;

  @IsNumber()
  @IsNotEmpty()
  readonly number: number;
}
