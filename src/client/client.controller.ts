import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: 'Client view' })
  @Roles('SUPER-ADMIN', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.clientService.findAll();
  }

  @ApiOperation({ summary: 'Client view by ID' })
  @Roles('SUPER-ADMIN', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @ApiOperation({ summary: 'Client update by ID' })
  @Roles('SUPER-ADMIN', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.clientService.update(+id, updateClientDto, image);
  }

  @ApiOperation({ summary: 'Client delete by ID' })
  @Roles('SUPER-ADMIN', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.clientService.delete(+id);
  }
}
