import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryContractDto {
  @ApiProperty({ example: 'Name', description: 'Contract name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
