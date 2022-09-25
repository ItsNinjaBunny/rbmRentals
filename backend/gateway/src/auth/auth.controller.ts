import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './/services/LocalAuthGuard';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }
  
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req
    ) { 
      return req.user;
  }
}

