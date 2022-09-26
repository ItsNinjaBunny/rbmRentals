import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import * as bcyrpt from 'bcryptjs';
import { Login } from './interfaces/login.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS')
    private readonly userClient: ClientProxy,
    @Inject(JwtService)
    private readonly jwt: JwtService
  ) { }

  async validateUser(username: string, password: string, ) {
    const user: Login = await lastValueFrom(this.getUser(username));
    if(user && await bcyrpt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Login) {
    const payload = { email: user.email, sub: user.id }

    return {
      access_token: this.jwt.sign(payload)
    }
  }

  getUser(username: string) {
  return this.userClient.send('get user', { username });
  }
}
