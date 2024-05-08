import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { now, Types } from "mongoose";
import { User } from '../../users/schemas/user.schema';

@Schema({toJSON: {virtuals: true}})
export class Comment {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ required: true, default: now() })
  publishedDate: Date;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  blogId: string;

  @Prop()
  parentCommentId: string;
}

const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.virtual('votes', {
  ref: 'Vote',
  localField: '_id',
  foreignField: 'comment'
});

export {CommentSchema};