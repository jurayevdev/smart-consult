import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAttr {
  full_name: string;
  email: string;
  description: string;
  image: string;
  hashed_password: string;
  hashed_refresh_token: string;
  role: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserAttr> {
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
  description: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  role: string;
}
