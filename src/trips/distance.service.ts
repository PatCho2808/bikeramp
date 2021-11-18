import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class DistanceService {
  constructor(private httpService: HttpService) {}
  private readonly url =
    'https://maps.googleapis.com/maps/api/distancematrix/json';

  getDistance(
    startAddress: string,
    destinationAddress: string,
  ): Observable<number> {
    return this.httpService
      .get(this.url, {
        params: {
          key: 'AIzaSyAm9g95Jy_ueu7LHjIGdW0D_To0SeKZvPM',
          destinations: destinationAddress,
          origins: startAddress,
        },
      })
      .pipe(map((res) => res.data.rows[0].elements[0].distance.value));
  }
}
