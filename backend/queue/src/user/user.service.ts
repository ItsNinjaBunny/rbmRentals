import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('MAIL')
    private readonly client: ClientProxy
  ) { }
  
  createAccountMail(message: { name: string, email: string, token: string }) {
    return this.client.emit('create account', message);
  }
}