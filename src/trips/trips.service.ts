import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from './trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,
  ) {}

  async addTrip(
    startAddress: string,
    destinationAddress: string,
    price: number,
    date: string,
  ): Promise<number> {
    const trip = this.tripRepository.create({
      startAddress,
      destinationAddress,
      price,
      date,
    });
    await this.tripRepository.save(trip);
    return trip.id;
  }
}
