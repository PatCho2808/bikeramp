import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from 'src/trips/trip.entity';
import { from, map } from 'rxjs';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,
  ) {}

  getWeeklyStats() {
    const mondayDate = this.getMondayDateOfCurrentWeek();
    const sundayDate = this.getSundayDateOfCurrentWeek();
    return from(
      this.tripRepository
        .createQueryBuilder('trip')
        .where('trip.date > :mondayDate', { mondayDate })
        .andWhere('trip.date < :sundayDate', { sundayDate })
        .select('SUM(trip.distance)', 'distance')
        .addSelect('SUM(trip.price)', 'price')
        .getRawOne(),
    ).pipe(
      map((result) => {
        return {
          total_distance: `${result.distance / 1000}km`,
          total_price: `${result.price}PLN`,
        };
      }),
    );
  }

  private getMondayDateOfCurrentWeek() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  }

  private getSundayDateOfCurrentWeek() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() + 7 - day + (day === 0 ? -7 : 0);
    return new Date(today.setDate(diff));
  }
}
