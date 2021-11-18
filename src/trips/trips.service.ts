import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { Repository } from 'typeorm';
import { DistanceService } from './distance.service';
import { Trip } from './trip.entity';

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
    date: string,
  ): Observable<Trip> {
    return this.distanceService
      .getDistance(startAddress, destinationAddress)
      .pipe(
        switchMap((distance) => {
          const trip = this.tripRepository.create({
            startAddress,
            destinationAddress,
            price,
            date: new Date(date),
            distance,
          });
          return from(this.tripRepository.save(trip));
        }),
      );
  }
}
