import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Contract } from 'src/contract/models/contract.model';

interface ClientAttr {
  name: string;
  passport_series: string;
  phone_number: string;
  image: any;
}

@Table({ tableName: 'client' })
export class Client extends Model<Client, ClientAttr> {
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
    type: DataType.STRING,
  })
  passport_series: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @HasMany(() => Contract, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  contract: Contract;
}
