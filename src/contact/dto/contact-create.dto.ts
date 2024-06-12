import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ContactCreateDto {
  @ApiProperty({ example: 'Name', description: 'Contact name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({example: 'Body', description: 'Contact body'})
  @IsNotEmpty()
  body: string
}
