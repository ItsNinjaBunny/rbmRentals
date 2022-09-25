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
    return this.client.send<string, CreateUser>('create user', createUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUser: UpdateUser) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
