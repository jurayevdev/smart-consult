import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contract } from './models/contract.model';
import { FilesService } from 'src/files/files.service';
import { Client } from 'src/client/models/client.model';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel(Contract) private repo: typeof Contract,
    @InjectModel(Client) private repoClient: typeof Client,
    private readonly fileService: FilesService,
  ) {}

  async create(createContractDto: CreateContractDto, image: any) {
    if (image) {
      let image_name: string;
      try {
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const client = await this.repoClient.create({
        name: createContractDto.name,
        passport_series: createContractDto.passport_series,
        phone_number: createContractDto.phone_number,
        image: createContractDto.image,
      });

      const contract = await this.repo.create({
        image: image_name,
        client_id: client.id,
        ...createContractDto,
      });

      return {
        message: 'Contract and client created',
        contract: contract,
        client: client,
      };
    }
    const client = await this.repoClient.create({
      name: createContractDto.name,
      passport_series: createContractDto.passport_series,
      phone_number: createContractDto.phone_number,
      image: createContractDto.image,
    });

    const contract = await this.repo.create({
      client_id: client.id,
      ...createContractDto,
    });
    return {
      message: 'Contract and client created',
      contract: contract,
      client: client,
    };
  }

  async findAll() {
    const contract = await this.repo.findAll({
      include: { all: true },
    });
    return contract;
  }

  async findOne(id: number) {
    const contract = await this.repo.findByPk(id);
    if (!contract) {
      throw new BadRequestException(`${id} - not contract`);
    }
    return contract;
  }

  async update(id: number, updateContractDto: UpdateContractDto, image: any) {
    const contract = await this.repo.findByPk(id);
    if (!contract) {
      throw new BadRequestException(`${id} -- not contract`);
    }
    if (image) {
      let image_name: string;
      try {
        if (contract.image !== 'null') {
          try {
            await this.fileService.deleteFile(contract.image);
          } catch (error) {
            throw new BadRequestException(error.message);
          }
        }
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const updateContract = await contract.update({
        image: image_name,
        ...updateContractDto,
      });
      return {
        message: 'Contract updated',
        contract: updateContract,
      };
    }
    const updateContract = await contract.update(updateContractDto);
    return {
      message: 'Contract updated',
      contract: updateContract,
    };
  }

  async delete(id: number) {
    const contract = await this.repo.findByPk(id);
    if (!contract) {
      throw new BadRequestException(`${id} - not contract`);
    }
    if (contract.image !== 'null') {
      try {
        await this.fileService.deleteFile(contract.image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
    contract.destroy();
    return {
      message: 'Contract deleted',
    };
  }
}
