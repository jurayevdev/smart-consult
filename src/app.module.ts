import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from './files/files.module';
import { CategoryContractModule } from './category-contract/category-contract.module';
import { ContractModule } from './contract/contract.module';
import { CategoryContract } from './category-contract/models/category-contract.model';
import { Contract } from './contract/models/contract.model';
import { ClientModule } from './client/client.module';
import { Client } from './client/models/client.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASS),
      database: process.env.POSTGRES_DB,
      models: [User, CategoryContract, Contract, Client],
      autoLoadModels: true,
      logging: false,
    }),
    FilesModule,
    JwtModule,
    UserModule,
    CategoryContractModule,
    ContractModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
