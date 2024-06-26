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
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles-auth-decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';

@ApiTags('Contract')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @ApiOperation({ summary: 'Contract create' })
  @Roles('SUPER-ADMIN', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createContractDto: CreateContractDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.contractService.create(createContractDto, image);
  }

  @ApiOperation({ summary: 'Contract view' })
  @Roles('SUPER-ADMIN', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.contractService.findAll();
  }

  @ApiOperation({ summary: 'Contract view by ID' })
  @Roles('SUPER-ADMIN', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @ApiOperation({ summary: 'Contract update by ID' })
  @Roles('SUPER-ADMIN', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.contractService.update(+id, updateContractDto, image);
  }

  @ApiOperation({ summary: 'Contract delete by ID' })
  @Roles('SUPER-ADMIN', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contractService.delete(+id);
  }
}
