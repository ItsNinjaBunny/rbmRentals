import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUser } from './interfaces/user.interface';
import { UpdateUser } from './interfaces/updated.user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
    @Inject('USERS')
    private readonly client: ClientProxy
  ) { }

  create(createUser: CreateUser) {
    return this.client.send<string, { user: CreateUser }>('create user', { user: createUser });
  }

  findAll() {
    return this.client.send<string, {}>('find all users', {});
  }

  findOne(id: string) {
    return this.client.send<string, { }>('find user by id', { });
  }

  update(id: string, updateUser: UpdateUser) {
    return this.client.send<string, { user: UpdateUser }>('update user', { user: updateUser });
  }

  remove(id: string) {
    return this.client.send<string, { }>('remove user', { });
  }
}
