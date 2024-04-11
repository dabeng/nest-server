import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './schemas/comment.schema';
import { APIFeatures } from 'src/common/apiFeatures';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comment') private readonly commentModel: Model<Comment>) { }

  create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return (new this.commentModel(createCommentDto)).save();
  }

  async findAll(query?: any): Promise<any> {
    const features = new APIFeatures(this.commentModel.find(), query)
      .filter()
      .sort()
      .select()
      .pagination();
    const comments = await features.mongooseQuery;
    const total = await features.metadata;
    return { data: comments, metadata: { total } };
  }

  findOne(id: string): Promise<Comment> {
    return this.commentModel.findById(id).exec();
  }

  update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true });
  }

  remove(id: string): Promise<Comment> {
    return this.commentModel.findByIdAndDelete(id);
  }
}
