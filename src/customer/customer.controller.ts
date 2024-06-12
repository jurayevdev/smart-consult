import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerCreateDto } from './dto/customer-create.dto';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Customer } from './models/customer.model';
import { CustomerUpdateDto } from './dto/customer-update.dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @ApiOperation({ summary: 'Customer create' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Post('')
  async create(
    @Body() createDto: CustomerCreateDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.service.create(createDto, res);
  }

  @ApiOperation({ summary: 'Customer view all' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Get('')
  async getAll() {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Customer view by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Customer> {
    return this.service.getOne(+id);
  }

  @ApiOperation({ summary: 'Customer delete by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @ApiOperation({ summary: 'Customer update by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: CustomerUpdateDto) {
    return this.service.update(+id, updateDto);
  }
}
