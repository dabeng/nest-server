import { BadRequestException } from '@nestjs/common';
import mongoose, {Types} from 'mongoose';
import {ObjectId} from 'mongodb';

export function toMongoObjectId({ value, key }): Types.ObjectId {
  if (mongoose.isValidObjectId(value)) {
    // console.log(new ObjectId(Types.ObjectId.createFromHexString(value)));
    // return Types.ObjectId.createFromHexString(value);
    // console.log(value);
    return new ObjectId(Types.ObjectId.createFromHexString(value));
    // return new Types.ObjectId(value);
  } else {
    throw new BadRequestException(`${key} is not a valid MongoId`);
  }
}