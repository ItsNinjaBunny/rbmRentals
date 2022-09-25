import { Module } from '@nestjs/common';
import { MailModule } from 'src/shared/mail.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MailModule,
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,

  ]
})
export class UserModule { }