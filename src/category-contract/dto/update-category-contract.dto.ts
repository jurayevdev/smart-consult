import { PartialType } from '@nestjs/swagger';
import { CreateCategoryContractDto } from './create-category-contract.dto';

export class UpdateCategoryContractDto extends PartialType(CreateCategoryContractDto) {}
