import { Inject, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
  constructor(
    @Inject(MailerService)
    private readonly mailer: MailerService,
    @Inject(ConfigService)
    private readonly config: ConfigService
  ) { }

  async sendUserConfirmation(name: string, email: string, token: string) {
    const url = `http://localhost:8080/auth/confirm/${token}`;

    await this.mailer.sendMail({
      to: email,
      subject: 'Welcome to RBM Rentals, Confirm your email',
      html: `
      <p>Welcome ${name}!</p>
      <p>Please click the link below to confirm your email</p>
      <p>
        <a href='${url}'>Confirm</a>
      </p>
      <p>If you did not request this email you can saftely ignore it.</p>
      `,
      from: this.config.get<string>('username')
    });
  }
}