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

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    return (new this.blogModel(createBlogDto)).save();
  }

  async findAll(query?: any): Promise<any> {
    const features =  new APIFeatures(this.blogModel.find(), query)
      .filter()
      .sort()
      .select()
      .pagination();
    //Execute the query
    const blogs = await features.mongooseQuery;
    const total = await features.metadata;
    return {data:blogs, metadata: {total}};
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogModel.findById(id).exec();
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true });
  }

  async remove(id: string): Promise<Blog> {
    return this.blogModel.findByIdAndDelete(id);
  }
}
