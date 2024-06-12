import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CustomerContact } from 'src/customer-contact/models/customer-contact.model';
import { UserContact } from 'src/user-contact/models/user-contact.model';

interface ContactAttr {
  name: string;
  body: string;
}

@Table({ tableName: 'contact' })
export class Contact extends Model<Contact, ContactAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  body: string;

  @HasMany(() => UserContact)
  userContact: UserContact;

  @HasMany(() => CustomerContact)
  customerContact: CustomerContact;
}
