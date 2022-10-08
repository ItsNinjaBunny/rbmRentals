import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { HomeService } from './home.service';
import { CreateHomeDto } from './classes/create-home.dto';
import { UpdateHomeDto } from './classes/update-home.dto';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @MessagePattern('create home')
  create(@Payload('home') createHomeDto: CreateHomeDto) {
    return this.homeService.create(createHomeDto);
  }

  @MessagePattern('upload house images')
  uploadImages(
    @Payload('images')
    images: Array<Express.Multer.File>,
    @Payload('id')
    id: string
  ) {
    return this.homeService.uploadImages(id, images);
  }

  @MessagePattern('findAllHome')
  findAll() {
    return this.homeService.findAll();
  }

  @MessagePattern('findOneHome')
  findOne(@Payload() id: string) {
    return this.homeService.findOne(id);
  }

  @MessagePattern('updateHome')
  update(
    @Payload()
    id: string,
    @Payload()
    updateHomeDto: UpdateHomeDto
    ) {
    return this.homeService.update(id, updateHomeDto);
  }

  @MessagePattern('removeHome')
  remove(@Payload() id: string) {
    return this.homeService.remove(id);
  }
}
