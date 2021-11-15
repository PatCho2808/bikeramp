import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trips/trip.entity';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [
    TripsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: '123456',
      entities: [Trip],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
