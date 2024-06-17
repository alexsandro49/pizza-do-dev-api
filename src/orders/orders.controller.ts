import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { PeriodOrderDto } from './dto/period-order.dto';
import { OrderByUserIdDto } from './dto/order-by-user-id.dto';
import { OrderDetailsDto } from './dto/order-details.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderDetailsDto> {
    return await this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  async getOrders(
    @Body(ValidationPipe) orderByUserIdDto: OrderByUserIdDto,
  ): Promise<Order[]> {
    return await this.ordersService.getOrders(orderByUserIdDto);
  }

  @Get('period')
  async getOrderByPeriod(
    @Body() periodOrderDto: PeriodOrderDto,
  ): Promise<Order[]> {
    return this.ordersService.getOrderByPeriod(periodOrderDto);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: OrderByUserIdDto): Promise<Order> {
    return await this.ordersService.getOrderById(id);
  }
}
