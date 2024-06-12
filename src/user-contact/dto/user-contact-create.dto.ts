import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserContactCreateDto {
    @ApiProperty({example: "1", description: "User Id"})
    @IsNotEmpty()
    user_id: number

    @ApiProperty({example: "1", description: "Contact Id"})
    @IsNotEmpty()
    contact_id: number
}
