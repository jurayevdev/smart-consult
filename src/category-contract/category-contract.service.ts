import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryContractDto } from './dto/create-category-contract.dto';
import { UpdateCategoryContractDto } from './dto/update-category-contract.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryContract } from './models/category-contract.model';

@Injectable()
export class CategoryContractService {
  constructor(
    @InjectModel(CategoryContract)
    private readonly repo: typeof CategoryContract,
  ) {}

  async create(createCategoryContractDto: CreateCategoryContractDto) {
    const category_contract = await this.repo.create(createCategoryContractDto);
    return {
      message: 'Contract category created',
      category_contract: category_contract,
    };
  }

  async findAll() {
    const category_contract = await this.repo.findAll({
      include: { all: true },
    });
    return category_contract;
  }

  async findOne(id: number): Promise<CategoryContract> {
    const category_contract = await this.repo.findByPk(id);
    if(!category_contract){
      throw new BadRequestException(`${id} - not contract category`)
    }
    return category_contract;
  }

  async update(id: number, updateCategoryContractDto: UpdateCategoryContractDto) {
    const category_contract = await this.repo.findByPk(id)
    if(!category_contract){
      throw new BadRequestException(`${id} -- not contract category`)
    }
    const updateCategoryContract = await category_contract.update(updateCategoryContractDto)
    return {
      message: "Contract category updated",
      category_contract: updateCategoryContract
    }
  }

  async delete(id: number) {
    const category_contract = await this.repo.findByPk(id);
    if(!category_contract){
      throw new BadRequestException(`${id} - not contract category`)
    }
    category_contract.destroy();
    return {
      message: "Contract category deleted"
    }
  }
}
