import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Contract } from 'src/contract/models/contract.model';

interface CategoryAttr {
  name: string;
}

@Table({ tableName: 'category_contract' })
export class CategoryContract extends Model<CategoryContract, CategoryAttr> {
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

  @HasMany(() => Contract, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  contract: Contract;
}
