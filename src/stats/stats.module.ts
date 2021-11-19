import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Trip } from 'src/trips/trip.entity';
import { StatsService } from './services/stats.service';
import { StatsController } from './stats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), SharedModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
