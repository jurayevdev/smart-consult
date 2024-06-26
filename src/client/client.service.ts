import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client) private repo: typeof Client,
    private readonly fileService: FilesService,
  ) {}

  async findAll() {
    const client = await this.repo.findAll({
      include: { all: true },
    });
    return client;
  }

  async findOne(id: number) {
    const client = await this.repo.findByPk(id);
    if (!client) {
      throw new BadRequestException(`${id} - not client`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto, image: any) {
    const client = await this.repo.findByPk(id);
    if (!client) {
      throw new BadRequestException(`${id} -- not client`);
    }
    if (image) {
      let image_name: string;
      try {
        if (client.image !== 'null') {
          try {
            await this.fileService.deleteFile(client.image);
          } catch (error) {
            throw new BadRequestException(error.message);
          }
        }
        image_name = await this.fileService.createFile(image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      const updateClient = await client.update({
        image: image_name,
        ...updateClientDto,
      });
      return {
        message: 'Client updated',
        client: updateClient,
      };
    }
    const updateClient = await client.update(updateClientDto);
    return {
      message: 'Client updated',
      client: updateClient,
    };
  }

  async delete(id: number) {
    const client = await this.repo.findByPk(id);
    if (!client) {
      throw new BadRequestException(`${id} - not client`);
    }
    if (client.image !== 'null') {
      try {
        await this.fileService.deleteFile(client.image);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
    client.destroy();
    return {
      message: 'Client deleted',
    };
  }
}
