import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly service: UserService
  ) { }

  @EventPattern('create account')
  getCreateAccountMessage(message: { name: string, email: string, token: string }) {
    return this.service.createAccountMail(message);
  }
} 