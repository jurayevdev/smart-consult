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
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { CustomerContactService } from './customer-contact.service';
import { CustomerContactCreateDto } from './dto/customer-contact-create.dto';
import { CustomerContact } from './models/customer-contact.model';
import { CustomerContactUpdateDto } from './dto/customer-contact-update.dto';

@ApiTags('Customer contact')
@Controller('customer-contact')
export class CustomerContactController {
  constructor(private readonly service: CustomerContactService) {}

  @ApiOperation({ summary: 'Customer contact create' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Post('')
  async create(
    @Body() createDto: CustomerContactCreateDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.service.create(createDto, res);
  }

  @ApiOperation({ summary: 'Customer contact view all' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Get('')
  async getAll() {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Customer contact view by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<CustomerContact> {
    return this.service.getOne(+id);
  }

  @ApiOperation({ summary: 'Customer contact delete by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @ApiOperation({ summary: 'Customer contact update by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: CustomerContactUpdateDto,
  ) {
    return this.service.update(+id, updateDto);
  }
}
