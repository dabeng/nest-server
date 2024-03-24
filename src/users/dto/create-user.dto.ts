import { IsString, IsEmail, MinLength, IsArray } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsArray()
  roles: string[];

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  'self-intro': string;

  @IsString()
  refreshToken: string;
}
