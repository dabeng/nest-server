import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { now } from "mongoose";

@Schema()
export class Post {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop()
  subtitle: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: now() })
  publishedDate: Date;

  @Prop({ required: true, default: now() })
  updatedDate: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);