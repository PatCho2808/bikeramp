import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { Trip } from './trips/trip.entity';
import { TripsModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';
import { SharedModule } from './shared/shared.module';
import * as Joi from 'joi';

@Module({
  imports: [
    TripsModule,
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        GOOGLE_API_KEY: Joi.string().required(),
        DB_TYPE: Joi.valid('postgres', 'mysql').required(),
        DB_HOST: Joi.string().hostname().required(),
        DB_PORT: Joi.number().port().required(),
        DB_USERNAME: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
      }),
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
