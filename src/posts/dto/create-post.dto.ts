import { IsString, IsEmail, MinLength, IsArray, IsDate } from 'class-validator';
export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  author: string;

  @IsString()
  content: string;

  @IsDate()
  publishedDate: Date;

  @IsDate()
  updatedDate: Date;
}
