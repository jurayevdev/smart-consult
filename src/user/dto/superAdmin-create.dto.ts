import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SuperAdminCreateDto {
  @ApiProperty({ example: 'Joh Doe', description: 'Super Admin name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@gmail.com', description: 'Super Admin email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'Super Admin password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {})
  password: string;
}