import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { now, Types } from "mongoose";
import { User } from '../../users/schemas/user.schema';

@Schema()
export class Blog {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  subtitle: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ required: true, default: now() })
  publishedDate: Date;

  @Prop()
  updatedDate: Date;

  @Prop({ required: true })
  content: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);