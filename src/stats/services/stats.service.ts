import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trip } from 'src/trips/trip.entity';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,
  ) {}

  getWeeklyStats() {
    const mondayDate = this.getMondayDateOfCurrentWeek();
    const sundayDate = this.getSundayDateOfCurrentWeek();
    return from(this.getSumsByDateRange(mondayDate, sundayDate)).pipe(
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
    const dateOfFirstDayOfMonth = this.getDateOfFirstDayOfTheMonth();
    const dateOfLastDayOfMonth = this.getDateOfLastDayOfTheMonth();
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

  private getDateOfFirstDayOfTheMonth() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 2);
  }

  private getDateOfLastDayOfTheMonth() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 1);
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
