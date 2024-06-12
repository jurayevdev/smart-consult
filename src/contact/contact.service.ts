import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from './models/contact.model';
import { ContactCreateDto } from './dto/contact-create.dto';
import { ContactUpdateDto } from './dto/contact-update.dto';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact) private repo: typeof Contact) {}

  async create(createDto: ContactCreateDto, res: Response) {
    const contact = await this.repo.create(createDto);
    return {
      message: 'Contact created',
      contact: contact,
    };
  }

  async getAll() {
    const contact = await this.repo.findAll({ include: { all: true } });
    return contact;
  }

  async getOne(id: number): Promise<Contact> {
    const contact = await this.repo.findByPk(id);
    return contact;
  }

  async delete(id: number) {
    this.repo.destroy({ where: { id } });
    return {
      message: 'Contact deleted',
    };
  }

  async update(id: number, updateDto: ContactUpdateDto) {
    const contact = await this.repo.update(updateDto, {
      where: { id },
    });
    return {
      message: 'Contact updated',
      contact: contact,
    };
  }
}
