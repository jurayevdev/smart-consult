import { Module } from '@nestjs/common';
import { UserContactController } from './user-contact.controller';
import { UserContactService } from './user-contact.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserContact } from './models/user-contact.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([UserContact]), JwtModule],
  controllers: [UserContactController],
  providers: [UserContactService],
})
export class UserContactModule {}
