import { IsString, IsEmail, MinLength, IsArray, IsDate } from 'class-validator';
export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  author: string;

  @IsDate()
  publishedDate: Date;

  @IsDate()
  updatedDate: Date;

  @IsString()
  content: string;
}
