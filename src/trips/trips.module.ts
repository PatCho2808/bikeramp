import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistanceService } from './services/distance.service';
import { Trip } from './trip.entity';
import { TripsController } from './trips.controller';
import { TripsService } from './services/trips.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), HttpModule, ConfigService],
  controllers: [TripsController],
  providers: [TripsService, DistanceService, ConfigService],
})
export class TripsModule {}
