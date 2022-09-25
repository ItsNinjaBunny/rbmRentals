import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RabbitService } from "./rabbit.service";

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'user-messages',
          queueOptions: {
            durable: false
          }
        }
      }
    ]),
  ],
  providers: [RabbitService],
  exports: [RabbitService]
})
export class RabbitModule { }