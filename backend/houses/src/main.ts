import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    Transport: Transport.TCP,
    options: {
      port: 4000
    }
  });
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen();
}
bootstrap();
