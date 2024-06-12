import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserLoginDto {
  @ApiProperty({ example: 'john@gmail.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {})
  password: string;
}
