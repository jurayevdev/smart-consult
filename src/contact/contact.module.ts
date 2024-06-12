import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contact } from './models/contact.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Contact]), JwtModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
