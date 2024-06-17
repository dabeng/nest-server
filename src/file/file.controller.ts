import { Post, UseInterceptors, UploadedFile, Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';

@Controller('file') // Base route for file-related operations
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload') // Endpoint for uploading files
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }), 
  ) // Intercept and handle file uploads
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Delegate file handling to the FileService
    return await this.fileService.uploadFile(file);
  }
}