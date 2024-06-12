import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserContact } from './models/user-contact.model';
import { UserContactCreateDto } from './dto/user-contact-create.dto';
import { UserContactUpdateDto } from './dto/user-contact-update.dto';


@Injectable()
export class UserContactService {
  constructor(@InjectModel(UserContact) private repo: typeof UserContact) {}

  async create(createDto: UserContactCreateDto, res: Response) {
    const user_contact = await this.repo.create(createDto);
    return {
      message: 'User contact created',
      user_contact: user_contact,
    };
  }

  async getAll() {
    const user_contact = await this.repo.findAll({ include: { all: true } });
    return user_contact;
  }

  async getOne(id: number): Promise<UserContact> {
    const user_contact = await this.repo.findByPk(id);
    return user_contact;
  }

  async delete(id: number) {
    this.repo.destroy({ where: { id } });
    return {
      message: 'User contact deleted',
    };
  }

  async update(id: number, updateDto: UserContactUpdateDto) {
    const user_contact = await this.repo.update(updateDto, {
      where: { id },
    });
    return {
      message: 'User contact updated',
      user_contact: user_contact,
    };
  }
}
