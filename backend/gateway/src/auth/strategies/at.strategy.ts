import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-at') {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
    @Inject('USERS')
    private readonly userClient: ClientProxy
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ingoreExpiration: false,
      secretOrKey: config.get<string>('access_token')
    })
  }

  async getUserDetails(id: string) {
    return await lastValueFrom(this.userClient.send('get user by id', { id: id }));
  }

  async validate(payload: any) {
    // const user = await this.getUserDetails(payload.sub);
    return payload;
      
      // ...user
  }
}