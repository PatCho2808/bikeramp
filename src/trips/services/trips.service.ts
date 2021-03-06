import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { DistanceService } from './distance.service';
import { Trip } from '../trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,
    private distanceService: DistanceService,
  ) {}

  addTrip(
    startAddress: string,
    destinationAddress: string,
    price: number,
    date: Date,
  ): Observable<Trip> {
    return this.distanceService
      .getDistance(startAddress, destinationAddress)
      .pipe(
        switchMap((distance) => {
          const trip = this.tripRepository.create({
            startAddress,
            destinationAddress,
            price,
            date,
            distance,
          });
          return from(this.tripRepository.save(trip));
        }),
      );
  }
}
