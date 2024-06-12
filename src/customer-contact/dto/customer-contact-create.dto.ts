import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CustomerContactCreateDto {
    @ApiProperty({example: "1", description: "Customer Id"})
    @IsNotEmpty()
    customer_id: number

    @ApiProperty({example: "1", description: "Contact Id"})
    @IsNotEmpty()
    contact_id: number
}
