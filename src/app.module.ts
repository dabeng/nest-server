import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BlogsModule } from './blogs/blogs.module';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest-server'), UsersModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), BlogsModule, CommentsModule, VotesModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
