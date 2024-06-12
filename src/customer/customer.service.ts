import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { CustomerCreateDto } from './dto/customer-create.dto';
import { CustomerUpdateDto } from './dto/customer-update.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer) private repo: typeof Customer) {}

  async create(createDto: CustomerCreateDto, res: Response) {
    const customer = await this.repo.create(createDto);
    return {
      message: 'Customer created',
      customer: customer,
    };
  }

  async getAll() {
    const customer = await this.repo.findAll({ include: { all: true } });
    return customer;
  }

  async getOne(id: number): Promise<Customer> {
    const customer = await this.repo.findByPk(id);
    return customer;
  }

  async delete(id: number) {
    this.repo.destroy({ where: { id } });
    return {
      message: 'Customer deleted',
    };
  }

  async update(id: number, updateDto: CustomerUpdateDto) {
    const customer = await this.repo.update(updateDto, {
      where: { id },
    });
    return {
      message: 'Customer updated',
      customer: customer,
    };
  }
}
