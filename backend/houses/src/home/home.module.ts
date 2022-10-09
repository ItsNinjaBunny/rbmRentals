import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { AddressModule } from 'src/address/address.module';
import { PrismaModule } from 'src/shared/prisma.module';
import { BucketModule } from 'src/aws/bucket.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    BucketModule,
    AddressModule],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule { }
