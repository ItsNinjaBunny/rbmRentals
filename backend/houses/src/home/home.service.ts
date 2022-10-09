import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/shared/prisma.service';
import { CreateHomeDto } from './classes/create-home.dto';
import { UpdateHomeDto } from './classes/update-home.dto';
import { v4 as uuid } from 'uuid';
import { AddressService } from 'src/address/address.service';
import { BucketService } from 'src/aws/bucket.service';
import { FindOneOptions } from './classes/find.one.options';

@Injectable()
export class HomeService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
    @Inject(ConfigService)
    private readonly config: ConfigService,
    @Inject(BucketService)
    private readonly bucket: BucketService,
    @Inject(AddressService)
    private readonly addressService: AddressService,
  ) { }

  async create(createHomeDto: CreateHomeDto) {
    createHomeDto.id = uuid();
    const {
      address,
      amenities,
      id,
      address_id,
      amenity_id,
      ...home
    } = createHomeDto;

    const rooms: { room_number: string }[] = []
    for (let i = 1; i <= home.beds; i++) {
      rooms.push({ room_number: `${home.property_name}-Room-${i}` })
    }
    if (!await this.addressService.containsCity(address)) {
      const house = await this.prisma.house.create({
        data: {
          ...home,
          address: {
            create: {
              ...address
            }
          },
          house_amenities: {
            create: {
              ...amenities
            }
          },
          rooms: {
            create: rooms.map(room => ({ room_number: room.room_number }))
          }
        },
        include: {
          house_amenities: true,
          rooms: true,
          address: true
        }
      });
      return house;
    }
    const createHome = await this.prisma.house.create({
      data: {
        ...home,
        house_amenities: {
          create: {
            ...amenities
          },
        },
        rooms: {
          create: rooms.map(room => ({ room_number: room.room_number }))
        }
      },
      include: {
        house_amenities: true,
        rooms: true,
      }
    });
    return await this.prisma.address.update({
      where: {
        city_state: {
          city: this.addressService.capitolizeLetter(address.city),
          state: address.state
        }
      },
      data: {
        house: {
          connect: {
            id: createHome.id
          }
        }
      }
    })
  }

  async uploadImages(id: string, images: Array<Express.Multer.File>) {

    for (let i = 0; i < images.length; i++) {
      const result = await this.bucket.uploadFile(images[i]);
      await this.prisma.image.create({
        data: {
          ...result,
          house: {
            connect: {
              id: id
            }
          }
        }
      })
    }

    return await this.findOne(id, {
      id: true,
      property_name: true,
      images: true
    });
  }

  async getGalleryImages() {
    const images = await this.prisma.image.findMany({
      where: {
        gallery: true
      }, select: {
        key: true,
        location: true,
      }
    });
    const url: string[] = [];
    for(let i = 0; i < images.length; i++) {
      url.push(await this.bucket.getSignedURL(
        this.config.get<string>('aws_bucket'),
        images[i].key,
        60
      ));
    }
    return url;
  }

  async findAll() {
    return await this.prisma.house.findMany();
  }

  findOne(id: string, options?: FindOneOptions) {
    return this.prisma.house.findUnique({
      where: { id: id }, 
      select: {
        ...options,
        id: true,
        property_name: true,
        house_amenities: true
      }
    });
  }

  async update(id: string, updateHomeDto: UpdateHomeDto) {
    const {
      room,
      amenities,
      amenity_id,
      address,
      address_id,
      ...house
    } = updateHomeDto;
    await this.prisma.house.update({
      where: { id: house.id },
      data: {
        ...house,
        house_amenities: {
          update: {
            ...amenities
          }
        },
        rooms: {
          updateMany: {
            where: {
              house_id: house.id
            },
            data: room
          }
        },
        address: {
          update: {
            ...address
          }
        }
      },
      include: {
        address: true,
        house_amenities: true,
        rooms: true
      }
    });
  }

  remove(id: string) {
    return this.prisma.house.delete({ where: { id: id } });
  }
}
