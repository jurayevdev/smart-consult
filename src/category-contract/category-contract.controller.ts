import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoryContractService } from './category-contract.service';
import { CreateCategoryContractDto } from './dto/create-category-contract.dto';
import { UpdateCategoryContractDto } from './dto/update-category-contract.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category Contract')
@Controller('category-contract')
export class CategoryContractController {
  constructor(private readonly categoryContractService: CategoryContractService) {}

  @ApiOperation({summary: "Contract category create"})
  @Post()
  create(@Body() createCategoryContractDto: CreateCategoryContractDto) {
    return this.categoryContractService.create(createCategoryContractDto);
  }

  @ApiOperation({summary: 'Contract category view'})
  @Get()
  findAll() {
    return this.categoryContractService.findAll();
  }

  @ApiOperation({summary: 'Contract category view by ID'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryContractService.findOne(+id);
  }

  @ApiOperation({summary: 'Contract category update by ID'})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoryContractDto: UpdateCategoryContractDto) {
    return this.categoryContractService.update(+id, updateCategoryContractDto);
  }

  @ApiOperation({summary: 'Contract category delete by ID'})
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryContractService.delete(+id);
  }
}
