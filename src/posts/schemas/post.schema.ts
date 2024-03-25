import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { now, Types } from "mongoose";
import { User } from '../../users/schemas/user.schema';

@Schema()
export class Post {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  subtitle: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: now() })
  publishedDate: Date;

  @Prop({ required: true, default: now() })
  updatedDate: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);