import { Body, Controller, Post } from '@nestjs/common';
import { TripsService } from './trips.service';

@Controller('api/trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Post()
  addTrip(
    @Body('start_address') startAddress: string,
    @Body('destination_address') destinationAddress: string,
    @Body('price') price: number,
    @Body('date') date: string,
  ) {
    return this.tripsService.addTrip(
      startAddress,
      destinationAddress,
      price,
      date,
    );
  }
}
