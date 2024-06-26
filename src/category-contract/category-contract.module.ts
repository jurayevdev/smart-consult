import { Module } from '@nestjs/common';
import { CategoryContractService } from './category-contract.service';
import { CategoryContractController } from './category-contract.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryContract } from './models/category-contract.model';

@Module({
  imports: [SequelizeModule.forFeature([CategoryContract])],
  controllers: [CategoryContractController],
  providers: [CategoryContractService],
})
export class CategoryContractModule {}
