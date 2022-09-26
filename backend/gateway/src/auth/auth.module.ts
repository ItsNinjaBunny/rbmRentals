import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local.guard';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS',
        transport: Transport.TCP,
        options: {
          port: 3500
        }
      }
    ]),
    PassportModule,
    JwtModule.register({})
  ],
  controllers: [
    AuthController, 
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    AtStrategy,
    RtStrategy
  ]
})
export class AuthModule {}
