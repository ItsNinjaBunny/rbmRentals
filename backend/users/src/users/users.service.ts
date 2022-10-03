import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { RabbitService } from 'src/shared/queue/rabbit.service';
import { CreateUser } from './interfaces/Create-User.interface.ts';
import { UpdateUser } from './interfaces/Update-User.interface.ts';


@Injectable()
export class UsersService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
    @Inject(RabbitService)
    private readonly rabbit: RabbitService,
  ) { }

  async getUser(username: string) {
    const user = await this.prisma.user.findUnique({ 
      where : { email: username },
      select: {
        id: true,
        email: true,
        password: true
      }
    });
    if(user)
      return user;
    return null;
  }

  async create(createUser: CreateUser) {
    if (await this.checkCredentials(createUser.email, createUser.phone_number))
      return new HttpException('that email or phone number already exists', HttpStatus.UNPROCESSABLE_ENTITY);

    createUser.id = uuid();
    const password = createUser.password;
    const hash = await bcrypt.hash(password, 10);
    createUser.password = hash;
    this.rabbit.createUser({ name: createUser.first_name, email: createUser.email, token: createUser.id });
    return this.prisma.user.create({ data: createUser });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
      select: {
        email: true,
        phone_number: true,
      }
    });
  }

  update(id: string, updateUser: UpdateUser) {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUser
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id: id }});
  }

  async getToken(id: string) {
    return await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        refresh_token: true
      }
    });
  }

  async logout(id: string) {
    await this.prisma.user.updateMany({
      where: { 
        id: id,
        refresh_token: {
          not: null,
        } },
      data: {
        refresh_token: null
      }
    });
  }

  private async checkCredentials(email: string, phone_number: string) {
    const result = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email }, { phone_number }
        ]
      }
    });

    if (result)
      return true;
    return false;
  }

  async updateRefreshToken(id: string, hash: string) {
    await this.prisma.user.update({
      where: { id: id },
      data: {
        refresh_token: hash
      }
    });
  }
}
