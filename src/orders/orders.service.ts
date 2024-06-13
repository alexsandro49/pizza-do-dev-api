import { Injectable } from '@nestjs/common';
import { Order } from './schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { PeriodOrderDto } from './dto/period-order.dto';
import { OrderByUserIdDto } from './dto/order-by-user-id.dto';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderModel.create(createOrderDto);
  }

  async getOrders(orderByUserIdDto: OrderByUserIdDto): Promise<Order[]> {
    return await this.orderModel.find({
      user_id: orderByUserIdDto.user_id,
    });
  }

  async getOrderById(orderByUserIdDto: OrderByUserIdDto): Promise<Order> {
    return await this.orderModel.findById(orderByUserIdDto);
  }

  async getOrderByPeriod(periodOrderDto: PeriodOrderDto): Promise<Order[]> {
    return await this.orderModel.find({
      user_id: periodOrderDto.user_id,
      createdAt: {
        $gte: periodOrderDto.startDate,
        $lte: periodOrderDto.endDate,
      },
    });
  }
}
