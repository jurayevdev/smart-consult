import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContractDto {
  @ApiProperty({ example: 'John Doe', description: 'Client name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'AA------', description: 'Client passport series' })
  @IsString()
  passport_series: string;

  @ApiProperty({ example: '+998901234567', description: 'Client phone number' })
  @IsString()
  phone_number: string;

  @ApiProperty({ example: '02-12-2024', description: 'Contract date' })
  @IsString()
  contract_date: string;

  @ApiProperty({ example: 'Info', description: 'Information bank' })
  info_bank: string;

  @ApiProperty({ example: 'Info', description: 'Information address' })
  info_address: string;

  @ApiProperty({ example: 'Image', description: 'Client image' })
  image: any;

  @ApiProperty({ example: 'ИНН', description: 'Client ИНН' })
  @IsString()
  inn: string;

  @ApiProperty({ example: 'R/s', description: 'R/s' })
  @IsString()
  rs: string;

  @ApiProperty({ example: 'MFO', description: 'MFO' })
  @IsString()
  mfo: string;

  @ApiProperty({ example: '1', description: 'Contract category ID' })
  @IsNotEmpty()
  category_contract_id: number;
}
