import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.model';
import { CustomerModule } from './customer/customer.module';
import { ContactModule } from './contact/contact.module';
import { UserContactModule } from './user-contact/user-contact.module';
import { CustomerContactModule } from './customer-contact/customer-contact.module';
import { Customer } from './customer/models/customer.model';
import { Contact } from './contact/models/contact.model';
import { UserContact } from './user-contact/models/user-contact.model';
import { CustomerContact } from './customer-contact/models/customer-contact.model';

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
      models: [User, Customer, Contact, UserContact, CustomerContact],
      autoLoadModels: true,
      logging: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'uploads'),
    }),
    UserModule,
    CustomerModule,
    ContactModule,
    UserContactModule,
    CustomerContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
