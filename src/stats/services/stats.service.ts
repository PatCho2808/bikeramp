import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from 'src/trips/trip.entity';
import { from, map } from 'rxjs';
import { DatesService } from 'src/shared/dates.service';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,
    private datesServices: DatesService,
  ) {}

  getWeeklyStats() {
    const mondayDate = this.datesServices.getMondayDateOfCurrentWeek();
    const sundayDate = this.datesServices.getSundayDateOfCurrentWeek();
    return from(this.getSumsByDateRange(mondayDate, sundayDate)).pipe(
      map((result) => {
        return {
          total_distance: `${result.distance / 1000}km`,
          total_price: `${result.price}PLN`,
        };
      }),
    );
  }

  private getSumsByDateRange(startDate: Date, endDate: Date) {
    return this.tripRepository
      .createQueryBuilder('trip')
      .where('trip.date > :mondayDate', { startDate })
      .andWhere('trip.date < :sundayDate', { endDate })
      .select('SUM(trip.distance)', 'distance')
      .addSelect('SUM(trip.price)', 'price')
      .getRawOne();
  }

  getMonthlyStats() {
    const dateOfFirstDayOfMonth =
      this.datesServices.getDateOfFirstDayOfTheMonth();
    const dateOfLastDayOfMonth =
      this.datesServices.getDateOfLastDayOfTheMonth();
    return from(
      this.getRawStatsByDateRange(dateOfFirstDayOfMonth, dateOfLastDayOfMonth),
    ).pipe(
      map((result) => {
        return result.map((dailySummary) => {
          return {
            day: dailySummary.trip_date,
            total_distance: `${dailySummary.distanceSum / 1000}km`,
            avg_ride: `${dailySummary.distanceAvg / 1000}km`,
            avg_price: `${parseInt(dailySummary.priceAvg).toFixed(2)}PLN`,
          };
        });
      }),
    );
  }

  private getRawStatsByDateRange(startDate: Date, endDate: Date) {
    return this.tripRepository
      .createQueryBuilder('trip')
      .where('trip.date > :startDate', { startDate })
      .andWhere('trip.date < :endDate', { endDate })
      .select('SUM(trip.distance)', 'distanceSum')
      .addSelect('trip.date')
      .addSelect('AVG(trip.distance)', 'distanceAvg')
      .addSelect('AVG(trip.price)', 'priceAvg')
      .groupBy('trip.date')
      .getRawMany();
  }
}
