import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto): Promise<Blog> {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.remove(id);
  }
}
