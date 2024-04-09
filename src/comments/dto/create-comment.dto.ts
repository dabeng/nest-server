import { IsString, IsEmail, MinLength, IsArray, IsDate } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  author: string;

  @IsDate()
  publishedDate: Date;

  @IsString()
  content: string;

  @IsString()
   blogId: string;

  @IsString()
  parentCommentId: string;
}
