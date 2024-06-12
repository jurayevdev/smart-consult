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
import { UserContactService } from './user-contact.service';
import { UserContactCreateDto } from './dto/user-contact-create.dto';
import { UserContact } from './models/user-contact.model';
import { UserContactUpdateDto } from './dto/user-contact-update.dto';

@ApiTags('User contact')
@Controller('user-contact')
export class UserContactController {
  constructor(private readonly service: UserContactService) {}

  @ApiOperation({ summary: 'User contact create' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Post('')
  async create(
    @Body() createDto: UserContactCreateDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.service.create(createDto, res);
  }

  @ApiOperation({ summary: 'User contact view all' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Get('')
  async getAll() {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'User contact view by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<UserContact> {
    return this.service.getOne(+id);
  }

  @ApiOperation({ summary: 'User contact delete by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @ApiOperation({ summary: 'User contact update by ID' })
  @Roles('ADMIN', 'SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UserContactUpdateDto,
  ) {
    return this.service.update(+id, updateDto);
  }
}
