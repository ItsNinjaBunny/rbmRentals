import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';
import * as bcyrpt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS')
    private readonly userClient: ClientProxy,
    @Inject(JwtService)
    private readonly jwt: JwtService,
    @Inject(ConfigService)
    private readonly config: ConfigService
  ) { }

  private async hashData(data: string) {
    return bcyrpt.hash(data, 10);
  }

  async validateUser(username: string, password: string, ) {
    const user: {id: string, password: string} = await lastValueFrom(this.getUserByEmail(username));
    if(user && await bcyrpt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(id: string) {
    const payload = { sub: id };
    const tokens = await this.generateTokens(payload.sub);
    await this.updateRefreshToken(payload.sub, tokens.refreshToken);
    return tokens;
  }

  async refreshToken(id: string, rt: string) {
    const { refresh_token } = await lastValueFrom(this.userClient.send('get rt', { id: id }));
    if(!refresh_token) throw new ForbiddenException('Access Denied');

    if(!await bcyrpt.compare(rt, refresh_token)) throw new ForbiddenException('Access Denied');

    const tokens = await this.generateTokens(id);
    await this.updateRefreshToken(id, tokens.refreshToken);
    return tokens;
  }

  logout(id: string) {
    this.userClient.emit('logout', { id: id });
    return { server: 'logged out' };
  }

  async updateRefreshToken(id: string, rt: string) {
    const hash = await this.hashData(rt);
    this.userClient.emit('update refresh token hash', { id: id, hash: hash });
  }

  async generateTokens(sub: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync({
          sub: sub,
        }, {
          secret: this.config.get<string>('access_token'),
          expiresIn: 60 * 15
        }
      ),
      this.jwt.signAsync({
        sub: sub,
      },{
        secret: this.config.get<string>('refresh_token'),
        expiresIn: 60 * 60 * 24 * 7
      })
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  }

  async getUserDetails(id: string) {
    return await lastValueFrom(this.userClient.send('get user by id', { id: id }));
  }

  getUserByEmail(username: string) {
    return this.userClient.send('get user', { username });
  }
}
