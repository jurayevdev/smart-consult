import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ example: 'Joh Doe', description: 'User name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Description', description: 'User description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'john@gmail.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Image', description: 'User image' })
  image: any;

  @ApiProperty({ example: 'qwerty', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {})
  password: string;
}
