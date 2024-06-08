import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getAllProducts(): string {
    return 'This action returns all products';
  }

  getProductById(): string {
    return 'This action returns a product by id';
  }
}
