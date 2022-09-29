import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class HomeService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService
  ) { }
  
  async create(createHomeDto: CreateHomeDto) {
    createHomeDto.id = uuid();
    const {
      amenities,
      room,
      ...home
    } = createHomeDto;

    await this.prisma.house.create({
      data: home
    });

    Object.entries(amenities).map(async ([key, value]) => {
      await this.prisma.amenity.create({
        data: {
          amenity_name: value.amenity_name,
          house: {
            connect: {
              id: home.id
            }
          }
        }
      })
    });

    Object.entries(room).map(async ([key, value]) => {
      await this.prisma.room.create({
        data: {
          room_number: value.room_number,
          house: {
            connect: {
              id: home.id
            }
          }
        }
      })
    })

    return this.findOne(home.id);
  }

  findAll() {
    return `This action returns all home`;
  }

  findOne(id: string) {
    return this.prisma.house.findUnique({ where: { id: id }});
  }

  update(id: string, updateHomeDto: UpdateHomeDto) {
    return `This action updates a #${id} home`;
  }

  remove(id: string) {
    return `This action removes a #${id} home`;
  }
}
