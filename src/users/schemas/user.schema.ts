import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  roles: string[];

  @Prop({ required: true })
  email: string;

  @Prop()
  'self-intro': string;

  // In fact the only way to be sure that an XSS attack can't steal your tokens is to keep the tokens
  // in a backend app, not in the browser.
  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

