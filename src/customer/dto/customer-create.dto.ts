import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CustomerCreateDto {
    @ApiProperty({example: "John", description: "Customer first name"})
    @IsString()
    @IsNotEmpty()
    first_name: string
    
    @ApiProperty({example: "Doe", description: "Customer last name"})
    @IsString()
    @IsNotEmpty()
    last_name: string

    @ApiProperty({example: "+998901234567", description: "Customer phone number"})
    @IsString()
    @IsNotEmpty()
    phone_number: string

    @ApiProperty({example: "Strit 23 home", description: "Customer address"})
    @IsString()
    @IsNotEmpty()
    address: string

    @ApiProperty({example: "NBU", description: "Customer bank"})
    @IsString()
    @IsNotEmpty()
    bank: string

    @ApiProperty({example: "MFO", description: "Customer MFO"})
    @IsString()
    @IsNotEmpty()
    mfo: string

    @ApiProperty({example: "INN", description: "Customer INN"})
    @IsString()
    @IsNotEmpty()
    inn: string

    @ApiProperty({example: "OKED", description: "Customer OKED"})
    @IsString()
    @IsNotEmpty()
    oked: string
}