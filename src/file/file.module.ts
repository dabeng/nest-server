import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  // imports: [
  //   MulterModule.register({ dest: './public' }), // Configure file storage location
  // ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService], // Make FileService available to other modules
})
export class FileModule {}