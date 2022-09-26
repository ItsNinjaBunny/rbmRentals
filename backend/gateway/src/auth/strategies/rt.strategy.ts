import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from 'express';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ingoreExpiration: false,
      secretOrKey: config.get<string>('refresh_token'),
      passReqToCallback: true
    })
  }

  async validate(req: Request, payload: any) {
    const token = req.get('authorization').replace('Bearer', '').trim();
    return {
      ...payload,
      token
    }
  }
}