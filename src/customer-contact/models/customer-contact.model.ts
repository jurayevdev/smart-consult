import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Contact } from 'src/contact/models/contact.model';
import { Customer } from 'src/customer/models/customer.model';

@Table({ tableName: 'customer_contact' })
export class CustomerContact extends Model<CustomerContact> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER
    })
    customer_id: number;
    @BelongsTo(() => Customer)
    customer: Customer

    @ForeignKey(() => Contact)
    @Column({
        type: DataType.INTEGER
    })
    contact_id: number;
    @BelongsTo(() => Contact)
    contact: Contact
}
