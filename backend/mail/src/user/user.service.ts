import { Inject, Injectable } from '@nestjs/common';
import { MailService } from 'src/shared/mailer.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(MailService)
    private readonly mailer: MailService
  ) { }

  sendVerifyAccount(name: string, email: string, token: string) {
    this.mailer.sendUserConfirmation(name, email, token);
  }
}