import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { PrismaModule } from './shared/prisma.module';

@Module({
  imports: [
    PrismaModule,
    HomeModule,
  ],
})
export class AppModule { }
