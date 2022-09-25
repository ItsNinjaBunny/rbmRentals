import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('port') || 8080;
  await app.listen(port);
  console.log(`listening on port ${port}`);
}
bootstrap();
