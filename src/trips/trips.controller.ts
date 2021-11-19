import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from 'src/shared/pipes/joi.pipe';
import { TripsService } from './services/trips.service';

@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Post()
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        start_address: Joi.string().required(),
        destination_address: Joi.string().required(),
        price: Joi.number().required().min(0),
        date: Joi.date().required(),
      }),
    ),
  )
  addTrip(
    @Body()
    body: {
      start_address: string;
      destination_address: string;
      price: number;
      date: Date;
    },
  ) {
    return this.tripsService.addTrip(
      body.start_address,
      body.destination_address,
      body.price,
      body.date,
    );
  }
}
