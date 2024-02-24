import { IsString, IsEmail, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  role: string;

  @IsString()
  @IsEmail()
  email: string;
}
