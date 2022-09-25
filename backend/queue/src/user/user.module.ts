import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIL',
        transport: Transport.TCP,
        options: {
          port: 8000
        }
      }
    ])
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
  ]
})
export class UserModule { }