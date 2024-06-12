import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CustomerContact } from 'src/customer-contact/models/customer-contact.model';

interface CustomerAttr {
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  bank: string;
  mfo: string;
  inn: string;
  oked: string;
}

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer, CustomerAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  bank: string;

  @Column({
    type: DataType.STRING,
  })
  mfo: string;

  @Column({
    type: DataType.STRING,
  })
  inn: string;

  @Column({
    type: DataType.STRING,
  })
  oked: string;

  @HasMany(() => CustomerContact)
  customerContact: CustomerContact;
}
