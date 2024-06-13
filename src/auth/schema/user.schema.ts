import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { gender } from '../enum/gender.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ default: '' })
  name: string;

  @Prop({ default: '' })
  cpf: string;

  @Prop({ default: new Date('0000').toISOString().split('T')[0] })
  dob: string;

  @Prop({ default: gender.Male })
  gender: gender;

  @Prop({ require: true })
  email: string;

  @Prop({ default: '' })
  tel: string;

  @Prop({ require: true })
  password: string;

  @Prop({ default: [{ street: '', neighborhood: '', number: 0 }] })
  adresses: [{ street: string; neighborhood: string; number: number }];
}

export const UserSchema = SchemaFactory.createForClass(User);
