import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { RabbitModule } from './shared/queue/rabbit.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    RabbitModule,
    UsersModule,
  ],
})
export class AppModule { }
