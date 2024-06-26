import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles-auth-decorator';
import { RolesGuard } from '../guards/roles.guard';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './models/user.model';
import { UserUpdateDto } from './dto/user-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ summary: 'Super Admin create' })
  @Post('super/create')
  @UseInterceptors(FileInterceptor('image'))
  async createSuper(
    @Body() createDto: UserCreateDto,
    @Res({ passthrough: true }) res: Response,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.service.createSuper(createDto, res, image);
  }

  @ApiOperation({ summary: 'User create' })
  @Roles('SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  async create(
    @Body() createDto: UserCreateDto,
    @Res({ passthrough: true }) res: Response,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.service.create(createDto, res, image);
  }

  @ApiOperation({ summary: 'User login' })
  @Post('login')
  async login(
    @Body() loginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.service.login(loginDto, res);
  }

  @ApiOperation({ summary: 'User logout' })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.service.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'User view all' })
  @Roles('SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'User view by ID' })
  @Roles('SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User> {
    return this.service.getOne(+id);
  }

  @ApiOperation({ summary: 'User delete by ID' })
  @Roles('SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @ApiOperation({ summary: 'User update by ID' })
  @Roles('SUPER-ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UserUpdateDto) {
    return this.service.update(+id, updateDto);
  }
}
