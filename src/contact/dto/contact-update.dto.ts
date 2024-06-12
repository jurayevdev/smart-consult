import { PartialType } from "@nestjs/swagger";
import { ContactCreateDto } from "./contact-create.dto";


export class ContactUpdateDto extends PartialType(ContactCreateDto){}