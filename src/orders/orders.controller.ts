import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders(): string {
    return this.ordersService.getOrders();
  }

  @Get('period')
  getOrderByPeriod(@Body() values: { startDate: Date; endDate: Date }): string {
    return this.ordersService.getOrderByPeriod(
      values.startDate,
      values.endDate,
    );
  }

  @Get(':id')
  getOrderById(@Param('id', ParseIntPipe) id: string): string {
    return this.ordersService.getOrderById(id);
  }
}
