import { IsString, IsEmail, MinLength, IsArray, IsDate, IsInt, IsObject, IsNotEmpty, IsMongoId, isMongoId } from 'class-validator';
import { Types, isObjectIdOrHexString } from "mongoose";
import { toMongoObjectId } from 'src/common/pipes/transformation.pipe';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export class CreateVoteDto {
  @IsNotEmpty()
  user: Types.ObjectId;

  @IsNotEmpty()
  comment: Types.ObjectId;

  @IsInt()
  upvote: number;

  @IsInt()
  downvote: number;

  @IsDate()
  createdDate: Date;
}


@Injectable()
export class CreateVoteConverterPipe implements PipeTransform{
  transform(body: any, metadata: ArgumentMetadata): CreateVoteDto {
    const result = new CreateVoteDto();
    // can of course contain more sophisticated mapping logic
    result.user = new ObjectId(Types.ObjectId.createFromHexString(body.user));
    result.comment = new ObjectId(Types.ObjectId.createFromHexString(body.comment));
    result.upvote = body.upvote;
    result.downvote = body.downvote;
    result.createdDate = body.createdDate;
    return result;
  }
}
