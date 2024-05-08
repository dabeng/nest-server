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
  /*
*** Reference by other field instead of _id ***
2024 - Mongoose version 8

suppose you have two schemas:

const playlistSchema = new mongoose.Schema({
  externalId: String,
  title: String,
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
  }],
});

const videoSchema = new mongoose.Schema({
  externalId: String,
  title: String,
});
And you want to populate the videos field from the playlistSchema based on externalId field from videoSchema:

There is a simple way to achieve this:

  PlaylistModel.find()
    .populate({
      path: 'videos',
      model: 'Video',
      select: 'title',
      foreignField: 'externalId',
    })
• path: specifies the field in the Announcement schema that you want to populate.
• model: specifies the model to use for population.
• select: specifies the fields to select from the referenced document.
• foreignField: specifies the field in the referenced model (Video in this case) that is used to match with the local field (videos in playlistSchema) for populating references. (instead of the default _id)
  
  */
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
