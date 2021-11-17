import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class GeocodingService {
  constructor(private httpService: HttpService) {}

  private url = 'http://api.positionstack.com/v1/forward';

  getCoordinates(location: string): Observable<{ lat: number; lon: number }> {
    return this.httpService
      .get(this.url, {
        params: {
          access_key: '3c45b378bde7879b08ded8c6a9b664fd',
          query: location,
          limit: 1,
        },
      })
      .pipe(
        map((res) => {
          return {
            lat: res.data.data[0].latitude,
            lon: res.data.data[0].longitude,
          };
        }),
      );
  }
}
