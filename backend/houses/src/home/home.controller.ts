import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @MessagePattern('create home')
  create(@Payload('home') createHomeDto: CreateHomeDto) {
    return this.homeService.create(createHomeDto);
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
  update(@Payload() updateHomeDto: UpdateHomeDto) {
    return this.homeService.update(updateHomeDto.id, updateHomeDto);
  }

  @MessagePattern('removeHome')
  remove(@Payload() id: string) {
    return this.homeService.remove(id);
  }
}
