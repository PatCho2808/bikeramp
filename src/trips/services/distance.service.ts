import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';

@Injectable()
export class DistanceService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  private readonly url =
    'https://maps.googleapis.com/maps/api/distancematrix/json';

  getDistance(
    startAddress: string,
    destinationAddress: string,
  ): Observable<number> {
    return this.httpService
      .get(this.url, {
        params: {
          key: this.configService.get('googleApi').key,
          destinations: destinationAddress,
          origins: startAddress,
        },
      })
      .pipe(map((res) => res.data.rows[0].elements[0].distance.value));
  }
}
