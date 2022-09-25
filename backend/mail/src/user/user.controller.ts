import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @EventPattern('create account')
  handleCreateAccount({ name, email, token }) {
    this.userService.sendVerifyAccount(name, email, token);
  }
}