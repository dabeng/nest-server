import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto, CreateVoteConverterPipe } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Vote } from './schemas/vote.schema';
import { ObjectId } from 'mongodb';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) { }

  @Post()
  // The following code snippets don't quite work as envisioned
  // @UsePipes(new CreateVoteConverterPipe(), new ValidationPipe({
  //   transform: true,
  //   transformOptions: { enableImplicitConversion: true },
  // }))
  // 这里关于pipe的使用，全是坑，目前的进度是，transform已经完成，但是传回来的createVoteDto的值并不是transformed的
  create(@Body() createVoteDto: CreateVoteDto): Promise<Vote> {
    // [TODO] 按理说如果pipe工作正常，下面两行是冗余的
    createVoteDto.user = new ObjectId(createVoteDto.user);
    createVoteDto.comment = new ObjectId(createVoteDto.comment);
    return this.votesService.create(createVoteDto);
  }

  @Get()
  async findAll(@Res() response: any, @Req() request: any): Promise<Vote[]> {
    const result = await this.votesService.findAll(request.query);
    return response.json(result);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Vote> {
    return this.votesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto): Promise<Vote> {
    return this.votesService.update(id, updateVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Vote> {
    return this.votesService.remove(id);
  }
}
