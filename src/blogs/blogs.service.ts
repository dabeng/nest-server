import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './schemas/blog.schema';
import { APIFeatures } from 'src/common/apiFeatures';

@Injectable()
export class BlogsService {

  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) { }

  async create(createPostDto: CreateBlogDto): Promise<Blog> {
    return (new this.blogModel(createPostDto)).save();
  }

  async findAll(query?: any): Promise<any> {
    const features =  new APIFeatures(this.blogModel.find(), query)
      .filter()
      .sort()
      .limit()
      .pagination();
    //Execute the query
    const blogs = await features.mongooseQuery;
    const metadata = await features.metadata;
    return {data:blogs, metadata};
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogModel.findById(id).exec();
  }

  async update(id: string, updatePostDto: UpdateBlogDto): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async remove(id: string): Promise<Blog> {
    return this.blogModel.findByIdAndDelete(id);
  }
}
