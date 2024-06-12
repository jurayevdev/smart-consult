import { PartialType } from '@nestjs/swagger';
import { CustomerContactCreateDto } from './customer-contact-create.dto';

export class CustomerContactUpdateDto extends PartialType(
  CustomerContactCreateDto,
) {}
