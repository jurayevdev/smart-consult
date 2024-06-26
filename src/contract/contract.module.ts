import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract } from './models/contract.model';
import { FilesModule } from 'src/files/files.module';
import { Client } from 'src/client/models/client.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Contract, Client]), FilesModule, JwtModule],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
