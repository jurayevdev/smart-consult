import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CategoryContract } from 'src/category-contract/models/category-contract.model';
import { Client } from 'src/client/models/client.model';

interface ContractAttr {
  name: string;
  passport_series: string;
  phone_number: string;
  contract_date: string;
  info_bank: string;
  info_address: string;
  image: any;
  inn: string;
  rs: string;
  mfo: string;
  html: string;
  category_contract_id: number;
  client_id: number;
}

@Table({ tableName: 'contract' })
export class Contract extends Model<Contract, ContractAttr> {
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
  contract_date: string;

  @Column({
    type: DataType.TEXT,
  })
  info_bank: string;

  @Column({
    type: DataType.TEXT,
  })
  info_address: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.STRING,
  })
  inn: string;

  @Column({
    type: DataType.STRING,
  })
  rs: string;

  @Column({
    type: DataType.STRING,
  })
  mfo: string;

  @Column({
    type: DataType.TEXT,
  })
  html: string;

  @ForeignKey(() => CategoryContract)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  category_contract_id: number;

  @BelongsTo(() => CategoryContract, {
    onDelete: 'CASCADE',
  })
  category_contract: CategoryContract;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  client_id: number;

  @BelongsTo(() => Client, {
    onDelete: 'CASCADE',
  })
  client: Client;
}
