import { Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { RtGuard } from './guards/rt.guard';
import { AtGuard } from './guards/at.guard';
import { GetCurrentUser } from 'src/shared/decorators/current.user';
import { GetCurrentUserId } from 'src/shared/decorators/current.user.id';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }
  
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(
    @Request() req
    ) { 
      return this.authService.login(req.user['id']);
  }

  @UseGuards(AtGuard)
  @HttpCode(200)
  @Post('logout')
  logout(@GetCurrentUserId() sub: string) {
    return this.authService.logout(sub);
  }

  @UseGuards(RtGuard)
  @HttpCode(200)
  @Post('refresh')
  refreshToken(
    @GetCurrentUserId()
    sub: string,
    @GetCurrentUser('token')
    token: string
  ) {
  return this.authService.refreshToken(sub, token);
  }
}

