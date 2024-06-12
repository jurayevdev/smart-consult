import { Module } from '@nestjs/common';
import { CustomerContactController } from './customer-contact.controller';
import { CustomerContactService } from './customer-contact.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerContact } from './models/customer-contact.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([CustomerContact]), JwtModule],
  controllers: [CustomerContactController],
  providers: [CustomerContactService],
})
export class CustomerContactModule {}
