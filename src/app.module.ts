import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest-server'), UsersModule, AuthModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
