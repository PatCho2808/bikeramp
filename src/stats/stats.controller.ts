import { Controller, Get } from '@nestjs/common';
import { StatsService } from './services/stats.service';

@Controller('api/stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('weekly')
  getWeeklyStats() {
    return this.statsService.getWeeklyStats();
  }

  @Get('monthly')
  getMonthlyStats() {
    return this.statsService.getMonthlyStats();
  }
}
