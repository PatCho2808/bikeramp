import { Module } from '@nestjs/common';
import { DatesService } from './services/dates.service';

@Module({
  providers: [DatesService],
  exports: [DatesService],
})
export class SharedModule {}
