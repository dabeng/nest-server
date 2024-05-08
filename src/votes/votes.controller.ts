import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { VotesService } from './votes.service';
import { Vote } from './schemas/vote.schema';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  create(@Body() createVoteDto: CreateVoteDto): Promise<Vote> {
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
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateVoteDto): Promise<Vote> {
    return this.votesService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Vote> {
    return this.votesService.remove(id);
  }
}
