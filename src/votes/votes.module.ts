import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { VoteSchema } from './schemas/vote.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Vote', schema: VoteSchema }])],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
