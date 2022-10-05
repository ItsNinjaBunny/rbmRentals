import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class AddressService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService
  ) { }

  async containsCity(city: string) {
    const result = await this.prisma.address.findUnique({
      where: {
        city: this.capitolizeLetter(city)
      }
    });
    return result === null ? false : true
  }

  capitolizeLetter(city: string) {
    if(city.includes(' ')) {
      const words = city.split(' ');
      words.forEach((word, index) => {
        let char = word.charAt(0);
        char = char.toUpperCase();
        words[index] = char + word.slice(1);
      });
      return words.join(' ');
    }
    let char = city.charAt(0);
    char = char.toUpperCase();
    return char + city.slice(1);
  }
}