import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsArray, IsMongoId } from 'class-validator';
import { ProductDto } from 'src/products/dto/product.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly user_id: string;

  @IsArray()
  @Type(() => ProductDto)
  readonly products: [ProductDto];

  @IsArray()
  @Type(() => ProductDto)
  readonly side_dishes: [ProductDto];

  @IsNumber()
  @IsNotEmpty()
  readonly deliver: number;

  @IsNumber()
  readonly adress: number;

  @IsNumber()
  @IsNotEmpty()
  readonly total_cust: number;
}
