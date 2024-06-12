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
import { ContactService } from './contact.service';
import { ContactCreateDto } from './dto/contact-create.dto';
import { Contact } from './models/contact.model';
import { ContactUpdateDto } from './dto/contact-update.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @ApiOperation({ summary: 'Contact create' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Post('')
  async create(
    @Body() createDto: ContactCreateDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.service.create(createDto, res);
  }

  @ApiOperation({ summary: 'Contact view all' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Get('')
  async getAll() {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Contact view by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Contact> {
    return this.service.getOne(+id);
  }

  @ApiOperation({ summary: 'Contact delete by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @ApiOperation({ summary: 'Contact update by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: ContactUpdateDto) {
    return this.service.update(+id, updateDto);
  }
}
