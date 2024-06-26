import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';


export class UpdateClientDto {
    @ApiProperty({ example: 'John Doe', description: 'Client name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'AA------', description: 'Client passport series' })
  @IsString()
  passport_series: string;

  @ApiProperty({ example: '+998901234567', description: 'Client phone number' })
  @IsString()
  phone_number: string;

  @ApiProperty({ example: 'Image', description: 'Client image' })
  image: any;
}
