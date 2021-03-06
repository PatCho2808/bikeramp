import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { Trip } from './trips/trip.entity';
import { TripsModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TripsModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.get('database'),
          entities: [Trip],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    StatsModule,
    SharedModule,
  ],
})
export class AppModule {}
