import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GoogleApiServiceAdaptee } from './googleApi.service';

interface IDistanceTarget {
  getDistance(
    startAddress: string,
    destinationAddress: string,
  ): Observable<number>;
}

@Injectable()
export class DistanceServiceAdapter implements IDistanceTarget {
  constructor(private adapteeService: GoogleApiServiceAdaptee) {}

  getDistance(
    startAddress: string,
    destinationAddress: string,
  ): Observable<number> {
    return this.adapteeService.getDistance(startAddress, destinationAddress);
  }
}
