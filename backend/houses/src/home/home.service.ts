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
      address,
      amenities,
      ...home
    } = createHomeDto;
    const rooms: { room_number: string }[] = []
    for(let i = 1; i <= home.beds; i++) {
      rooms.push({ room_number: `${home.property_name}-Room-${i}`})
    }

    const house = await this.prisma.house.create({
      data: {
        property_name: home.property_name,
        house_type: home.house_type,
        beds: home.beds,
        baths: home.baths,
        workspace: home.workspace,
        zipcode: home.zipcode,
        address: {
          create: {
            city: address.city,
            state_code: address.state_code
          }
        },
        house_amenities: {
          create: {
            master_bedroom: amenities.master_bedroom,
            outdoor_patio: amenities.outdoor_patio,
            fireplace: amenities.fireplace,
            firepit: amenities.firepit,
            pet_friendly: amenities.pet_friendly,
            locked_rooms: amenities.locked_rooms,
            parking: amenities.parking,
            backyard: amenities.backyard
          }
        },
        rooms: {
          // create: room.map(room => ({ room_number: room.room_number }))
          create: rooms.map(room => ({ room_number: room.room_number }))
        }
      },
      include: {
        house_amenities: true,
        rooms: true,
        address: true
      }
    })

    // await this.prisma.house.create({
    //   data: home
    // });

    // Object.entries(amenities).map(async ([key, value]) => {
    //   await this.prisma.amenity.create({
    //     data: {
    //       amenity_name: value.amenity_name,
    //       house: {
    //         connect: {
    //           id: home.id
    //         }
    //       }
    //     }
    //   })
    // });

    // Object.entries(room).map(async ([key, value]) => {
    //   await this.prisma.room.create({
    //     data: {
    //       room_number: value.room_number,
    //       house: {
    //         connect: {
    //           id: home.id
    //         }
    //       }
    //     }
    //   })
    // });



    return house;
  }

  findAll() {
    return this.prisma.house.findMany();
  }

  findOne(id: string) {
    return this.prisma.house.findUnique({ where: { id: id } });
  }

  async update(id: string, updateHomeDto: UpdateHomeDto) {
    const {
      room,
      amenities,
      address,
      ...house
    } = updateHomeDto;
    await this.prisma.house.update({
      where: { id: house.id },
      data: house
    });

    // Object.entries(amenities).map(async ([key, value]) => {
    //   await this.prisma.amenity.update({
    //     where: { id: 5 },
    //     data: { amenity_name: value.amenity_name }
    //   })
    // })
  }

  remove(id: string) {
    return this.prisma.house.delete({ where: { id: id } });
  }
}
