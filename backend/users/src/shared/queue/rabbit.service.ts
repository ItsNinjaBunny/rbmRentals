import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitService {
  constructor(
    @Inject('QUEUE')
    private readonly client: ClientProxy
  ) { }

  createUser(data: { name: string, email: string, token: string }): void {
    this.client.emit('create account', data);
  }
}