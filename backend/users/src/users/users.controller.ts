import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUser } from './interfaces/Create-User.interface.ts';
import { UpdateUser } from './interfaces/Update-User.interface.ts';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create user')
  async create(@Payload() createUser: CreateUser) {
    return await this.usersService.create(createUser);
  }

  @MessagePattern('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUser: UpdateUser) {
    return this.usersService.update(updateUser.id, updateUser);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }

  @MessagePattern('get user')
  async getUser(@Payload('username') username: string) {
    const user = await this.usersService.getUser(username);
    console.log(user);
    return user;
  }
}
