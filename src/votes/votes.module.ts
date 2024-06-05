import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VotesService } from './votes.service';
import { UsersModule } from '../users/users.module';
import { VotesController } from './votes.controller';
import { VoteSchema } from './schemas/vote.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Vote', schema: VoteSchema }]), UsersModule],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
