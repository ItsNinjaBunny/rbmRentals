import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUser } from './interfaces/Create-User.interface.ts';
import { UpdateUser } from './interfaces/Update-User.interface.ts';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create user')
  async create(@Payload('user') createUser: CreateUser) {
    return await this.usersService.create(createUser);
  }

  @MessagePattern('find all users')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('find user by id')
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('update user')
  update(@Payload() updateUser: UpdateUser) {
    return this.usersService.update(updateUser.id, updateUser);
  }

  @MessagePattern('remove user')
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }

  @MessagePattern('get user')
  async getUser(@Payload('username') username: string) {
    const user = await this.usersService.getUser(username);
    return user;
  }

  @MessagePattern('get user by id')
  async getUserById(@Payload('id') id: string) {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @MessagePattern('get rt')
  async getRt(@Payload('id') id: string) {
    return await this.usersService.getToken(id);
  }

  @EventPattern('logout')
  async logout(@Payload('id') id: string) {
    return this.usersService.logout(id);
  }

  @EventPattern('update refresh token hash')
  async updateRefreshToken(
    @Payload('id')
    id: string,
    @Payload('hash')
    hash: string
  ) {
    this.usersService.updateRefreshToken(id, hash);
  }

  @MessagePattern('verify account')
  async verifyAccount(
    @Payload('token')
    token: string
  ) {
    return await this.usersService.verifyAccount(token);
  }
}
