import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './services/local.strategy';
import { LocalAuthGuard } from './services/LocalAuthGuard';

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
  ],
  controllers: [
    AuthController, 
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard
  ]
})
export class AuthModule {}
