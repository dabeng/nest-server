import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest-server'), UsersModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
