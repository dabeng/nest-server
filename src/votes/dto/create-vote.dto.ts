import { IsString, IsEmail, MinLength, IsArray, IsDate, IsInt } from 'class-validator';

export class CreateVoteDto {
  @IsString()
  user: string;

  @IsString()
  comment: string;

  @IsInt()
  upvote: string;

  @IsInt()
  downvote: string;

  @IsDate()
  createdDate: Date;
}
