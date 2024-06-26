import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { FilesModule } from 'src/files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Client]), FilesModule, JwtModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
