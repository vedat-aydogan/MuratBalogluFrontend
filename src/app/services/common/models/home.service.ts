import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { CarouselImageModel } from '../../../contracts/models/carousel-image-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClientService: HttpClientService) { }

  getCarouselImages(): Observable<CarouselImageModel[]> {
    return this.httpClientService.get<CarouselImageModel[]>({ controller: "home", action: "getcarouselimages" });
  }

  deleteCarouselImage(id: string, fileName: string): Observable<any> {
    return this.httpClientService.delete<any>({ controller: "home", action: "deletecarouselimage", queryString: `fileName=${fileName}` }, id);
  }

}
