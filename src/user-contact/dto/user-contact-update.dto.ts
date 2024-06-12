import { PartialType } from '@nestjs/swagger';
import { UserContactCreateDto } from './user-contact-create.dto';

export class UserContactUpdateDto extends PartialType(UserContactCreateDto) {}
