import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { UserCreateDto } from './dto/user-create.dto';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.model';
import { UserLoginDto } from './dto/user-login.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { FilesService } from 'src/files/files.service';

let newUser: any;
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private repo: typeof User,
    private readonly jwtService: JwtService,
    private readonly fileService: FilesService,
  ) {}

  async createSuper(createDto: UserCreateDto, res: Response, image: any) {
    const user = await this.repo.findOne({ where: { role: 'SUPER-ADMIN' } });
    if (user) {
      throw new BadRequestException('Super Admin already exists!');
    }

    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }

      const hashed_password = await bcrypt.hash(createDto.password, 7);
      newUser = {
        ...createDto,
        image: image_name,
        hashed_password: hashed_password,
        role: 'SUPER-ADMIN',
      };

      const newConfirmUser = await this.repo.create({
        ...newUser,
      });

      const tokens = await this.getTokens(newConfirmUser);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      const updatedUser = await this.repo.update(
        {
          hashed_refresh_token: hashed_refresh_token,
        },
        { where: { id: newConfirmUser.id }, returning: true },
      );

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 42 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const response = {
        message: 'Super Admin created',
        user: updatedUser[1][0],
        tokens,
      };
      return response;
    }

    const hashed_password = await bcrypt.hash(createDto.password, 7);
    newUser = {
      ...createDto,
      hashed_password: hashed_password,
      role: 'SUPER-ADMIN',
    };

    const newConfirmUser = await this.repo.create({
      ...newUser,
    });

    const tokens = await this.getTokens(newConfirmUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.repo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: newConfirmUser.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Super Admin created',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async create(createDto: UserCreateDto, res: Response, image: any) {
    const user = await this.repo.findOne({ where: { email: createDto.email } });
    if (user) {
      throw new BadRequestException('Email already exists!');
    }

    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }

      const hashed_password = await bcrypt.hash(createDto.password, 7);
      newUser = {
        ...createDto,
        image: image_name,
        hashed_password: hashed_password,
        role: 'ADMIN',
      };

      const newConfirmUser = await this.repo.create({
        ...newUser,
      });

      const tokens = await this.getTokens(newConfirmUser);

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

      const updatedUser = await this.repo.update(
        {
          hashed_refresh_token: hashed_refresh_token,
        },
        { where: { id: newConfirmUser.id }, returning: true },
      );

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 15 * 42 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const response = {
        message: 'User created',
        user: updatedUser[1][0],
        tokens,
      };
      return response;
    }
    const hashed_password = await bcrypt.hash(createDto.password, 7);
    newUser = {
      ...createDto,
      hashed_password: hashed_password,
      role: 'ADMIN',
    };

    const newConfirmUser = await this.repo.create({
      ...newUser,
    });

    const tokens = await this.getTokens(newConfirmUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.repo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: newConfirmUser.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User created',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async login(loginDto: UserLoginDto, res: Response) {
    const { email, password } = loginDto;
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not created');
    }
    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Password error');
    }
    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.repo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const user = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const updatedUser = await this.repo.update(
      { hashed_refresh_token: null },
      { where: { id: user.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out',
      user: updatedUser[1][0],
    };
    return response;
  }

  async getAll() {
    const user = await this.repo.findAll({ include: { all: true } });
    return user;
  }

  async getOne(id: number): Promise<User> {
    const user = await this.repo.findByPk(id);
    return user;
  }

  async delete(id: number) {
    await this.repo.destroy({ where: { id } });
    return {
      message: 'User delete',
    };
  }

  async update(id: number, updateDto: UserUpdateDto) {
    const user = await this.repo.update(updateDto, {
      where: { id },
    });

    return {
      message: 'User updated',
      user: user,
    };
  }

  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('User not found!');
    }
    const user = await this.repo.findOne({ where: { id: user_id } });
    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('User not found!');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.repo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 42 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
      role: user.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
