import { Module } from '@nestjs/common';
import { JoiValidationPipe } from './pipes/joi.pipe';
import { DatesService } from './services/dates.service';

@Module({
  providers: [DatesService],
  exports: [DatesService],
})
export class SharedModule {}
