import { Post, UseInterceptors, UploadedFiles, Controller, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';

@Controller('file') // Base route for file-related operations
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('upload') // Endpoint for uploading files
  @UseInterceptors(
    FilesInterceptor('attachments', 10, {
      storage: diskStorage({
        destination: 'public/attachments',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  ) // Intercept and handle file uploads
  async uploadFile(@UploadedFiles(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 800 }),
      new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
    ],
  }),) files: Array<Express.Multer.File>) {
    // Delegate file handling to the FileService
    return await this.fileService.uploadFile(files);
  }
}