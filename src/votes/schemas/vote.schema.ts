import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { now, Types } from "mongoose";
import { User } from '../../users/schemas/user.schema';
import { Comment } from '../../comments/schemas/comment.schema';

@Schema()
export class Vote {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Comment' })
  comment: Comment;

  @Prop({ required: true })
  upvote: number;

  @Prop({ required: true })
  downvote: number;

  @Prop({ required: true, default: now() })
  createdDate: Date;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);