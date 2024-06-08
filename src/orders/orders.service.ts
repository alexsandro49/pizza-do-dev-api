import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  getOrders(): string {
    return 'This action returns all orders';
  }

  getOrderById(id: string): string {
    return 'This action returns a order by id';
  }

  getOrderByPeriod(startDate: Date, endDate: Date): string {
    return 'This action returns all orders in a period';
  }
}
