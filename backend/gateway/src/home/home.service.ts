import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';

@Injectable()
export class HomeService {
  constructor(
    @Inject('HOUSES')
    private readonly houseClient: ClientProxy
  ) { }

  create(createHomeDto: CreateHomeDto) {
    return this.houseClient.send('create home', { home: createHomeDto });
  }

  findAll() {
    return `This action returns all home`;
  }

  findOne(id: string) {
    return `This action returns a #${id} home`;
  }

  update(id: string, updateHomeDto: UpdateHomeDto) {
    return `This action updates a #${id} home`;
  }

  remove(id: string) {
    return `This action removes a #${id} home`;
  }
}
