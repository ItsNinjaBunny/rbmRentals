import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HOUSES',
        transport: Transport.TCP,
        options: {
          port: 4000
        }
      }
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
