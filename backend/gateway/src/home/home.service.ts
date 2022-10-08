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

  uploadFiles(id: string, files: Array<Express.Multer.File>) {
    return this.houseClient.send('upload house images', { id: id, images: files });
  }

  findAll() {
    return `This action returns all home`;
  }

  findOne(id: string) {
    return `This action returns a #${id} home`;
  }

  update(id: string, updateHomeDto: UpdateHomeDto) {
    return this.houseClient.send('update home', { id: id, updateHomeDto: updateHomeDto});
  }

  remove(id: string) {
    return `This action removes a #${id} home`;
  }
}
