import { Module } from '@nestjs/common';
import { DatesService } from './dates.service';

@Module({
  providers: [DatesService],
})
export class SharedModule {}
