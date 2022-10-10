import { Body, Controller, Get, HttpCode, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { RtGuard } from './guards/rt.guard';
import { AtGuard } from './guards/at.guard';
import { GetCurrentUser } from 'src/auth/shared/decorators/current.user.decorator';
import { GetCurrentUserId } from 'src/auth/shared/decorators/current.user.id.decorator';
import { Public } from 'src/auth/shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }
  
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(
    @Request() req
    ) { 
      return this.authService.login(req.user['id']);
  }

  @Public()
  @HttpCode(200)
  @Get('confirm/:token')
  async verifyAccount(
    @Param(':token')
    token: string
  ) {
    console.log(`this is the token: ${token}`);
    return await this.authService.verifyAccount(token);
  }

  @HttpCode(200)
  @Post('logout')
  logout(@GetCurrentUserId() sub: string) {
    return this.authService.logout(sub);
  }

  @Public()
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

