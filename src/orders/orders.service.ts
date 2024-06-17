import { Injectable } from '@nestjs/common';
import { Order } from './schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { PeriodOrderDto } from './dto/period-order.dto';
import { OrderByUserIdDto } from './dto/order-by-user-id.dto';
import { Model } from 'mongoose';
import { OrderDetailsDto, ProductDetailsDto } from './dto/order-details.dto';
import { User } from 'src/auth/schema/user.schema';
import { Product } from 'src/products/schema/product.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderDetailsDto> {
    await this.orderModel.create(createOrderDto);

    let orderId = await this.orderModel.findOne(
      { user_id: createOrderDto.user_id },
      {},
      { sort: { createAt: -1 } },
    );

    const userData: User = await this.userModel.findById(
      createOrderDto.user_id,
    );

    const [products, sideDishes]: [ProductDetailsDto[], ProductDetailsDto[]] =
      await this.getProductsDetails(createOrderDto);

    const orderDetails: OrderDetailsDto = {
      id: orderId._id.toString(),
      name: userData.name,
      cpf: userData.cpf,
      adress: userData.adresses[createOrderDto.adress],
      products: products,
      side_dishes: sideDishes,
      deliver: createOrderDto.deliver,
      total_cust: createOrderDto.total_cust,
    };

    return orderDetails;
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

  private async getProductsDetails(
    createOrderDto: CreateOrderDto,
  ): Promise<[ProductDetailsDto[], ProductDetailsDto[]]> {
    let products: ProductDetailsDto[] = [];
    let sideDishes: ProductDetailsDto[] = [];

    let productsId: string[] = [];
    let sideDishesId: string[] = [];

    createOrderDto.products.forEach((product) => {
      productsId.push(product._id);
    });
    createOrderDto.side_dishes.forEach((sideDishe) => {
      sideDishesId.push(sideDishe._id);
    });

    const productsData = await this.productModel.find({
      _id: { $in: productsId },
    });
    const sideDishesData = await this.productModel.find({
      _id: { $in: sideDishesId },
    });

    productsData.forEach((product) => {
      let comments = createOrderDto.products.find(
        (createOrderDtoProduct) =>
          createOrderDtoProduct._id === product._id.toString(),
      ).comments;

      products.push({
        name: product.name,
        price: product.price,
        description: product.description,
        comments: comments === undefined ? '' : comments,
        amount: createOrderDto.products.find(
          (createOrderDtoProduct) =>
            createOrderDtoProduct._id === product._id.toString(),
        ).amount,
      });
    });

    sideDishesData.forEach((sideDishe) => {
      let comments = createOrderDto.side_dishes.find(
        (createOrderDtoSideDishe) =>
          createOrderDtoSideDishe._id === sideDishe._id.toString(),
      ).comments;

      sideDishes.push({
        name: sideDishe.name,
        price: sideDishe.price,
        description: sideDishe.description,
        comments: comments === undefined ? '' : comments,
        amount: createOrderDto.side_dishes.find(
          (createOrderDtoSideDishe) =>
            createOrderDtoSideDishe._id === sideDishe._id.toString(),
        ).amount,
      });
    });

    return [products, sideDishes];
  }
}
