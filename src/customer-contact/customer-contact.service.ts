import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerContact } from './models/customer-contact.model';
import { CustomerContactCreateDto } from './dto/customer-contact-create.dto';
import { CustomerContactUpdateDto } from './dto/customer-contact-update.dto';


@Injectable()
export class CustomerContactService {
  constructor(@InjectModel(CustomerContact) private repo: typeof CustomerContact) {}

  async create(createDto: CustomerContactCreateDto, res: Response) {
    const customer_contact = await this.repo.create(createDto);
    return {
      message: 'Customer contact created',
      customer_contact: customer_contact,
    };
  }

  async getAll() {
    const customer_contact = await this.repo.findAll({ include: { all: true } });
    return customer_contact;
  }

  async getOne(id: number): Promise<CustomerContact> {
    const customer_contact = await this.repo.findByPk(id);
    return customer_contact;
  }

  async delete(id: number) {
    this.repo.destroy({ where: { id } });
    return {
      message: 'Customer contact deleted',
    };
  }

  async update(id: number, updateDto: CustomerContactUpdateDto) {
    const customer_contact = await this.repo.update(updateDto, {
      where: { id },
    });
    return {
      message: 'Customer contact updated',
      customer_contact: customer_contact,
    };
  }
}
