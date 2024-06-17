import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';

export type UserDocument = HydratedDocument<Order>;

@Schema({ timestamps: true, versionKey: false })
export class Order {
  @Prop({ type: SchemaTypes.ObjectId })
  user_id: ObjectId;

  @Prop()
  products: [{ _id: string; amount: number; comments: string }];

  @Prop()
  side_dishes: [{ _id: string; amount: number; comments: string }];

  @Prop()
  deliver: boolean;

  @Prop({ default: 0 })
  adress: number;

  @Prop()
  total_cust: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
