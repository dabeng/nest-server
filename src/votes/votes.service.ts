import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Vote } from './schemas/vote.schema';
import { APIFeatures } from 'src/common/apiFeatures';

@Injectable()
export class VotesService {
  constructor(@InjectModel('Vote') private readonly voteModel: Model<Vote>) { }

  create(createVoteDto: CreateVoteDto): Promise<Vote> {
    return (new this.voteModel(createVoteDto)).save();
  }

  async findAll(query?: any): Promise<any> {
    const features = new APIFeatures(this.voteModel.find(), query)
      .filter()
      .sort()
      .select()
      .pagination();
    const comments = await features.mongooseQuery;
    const total = await features.metadata;
    return { data: comments, metadata: { total } };
  }

  findOne(id: string): Promise<Vote> {
    return this.voteModel.findById(id).exec();
  }

  update(id: string, updateVoteDto: UpdateVoteDto): Promise<Vote> {
    return this.voteModel.findByIdAndUpdate(id, updateVoteDto, { new: true });
  }

  remove(id: string): Promise<Vote> {
    return this.voteModel.findByIdAndDelete(id);
  }
}
