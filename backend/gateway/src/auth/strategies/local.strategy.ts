import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthService)
    private readonly auth: AuthService
  ) { super() }

  async validate(username: string, password: string) {
    const user = await this.auth.validateUser(username, password);
    if(!user)
      return new UnauthorizedException();
    return user;
  }
}