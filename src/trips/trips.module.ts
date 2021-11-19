import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistanceService } from './services/distance.service';
import { Trip } from './trip.entity';
import { TripsController } from './trips.controller';
import { TripsService } from './services/trips.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
    HttpModule,
    ConfigService,
    SharedModule,
  ],
  controllers: [TripsController],
  providers: [TripsService, DistanceService, ConfigService],
})
export class TripsModule {}
