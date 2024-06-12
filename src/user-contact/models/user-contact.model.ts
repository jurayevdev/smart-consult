import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Contact } from 'src/contact/models/contact.model';
import { User } from 'src/user/models/user.model';


@Table({ tableName: 'user_contact' })
export class UserContact extends Model<UserContact> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    user_id: number;
    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Contact)
    @Column({
        type: DataType.INTEGER
    })
    contact_id: number;
    @BelongsTo(() => Contact)
    contact: Contact
}
