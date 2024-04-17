import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { AboutMeAddModel } from '../../../contracts/models/about-me-add-model';
import { Observable } from 'rxjs';
import { AboutMeModel } from '../../../contracts/models/about-me-model';
import { AboutMeWithImageModel } from '../../../contracts/models/about-me-with-image-model';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {

  constructor(private httpClientService: HttpClientService) { }

  addAboutMe(aboutMeAddModel: AboutMeAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "aboutme", action: "addaboutme" }, aboutMeAddModel);
  }

  addHomeAboutMe(aboutMeAddModel: AboutMeAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "aboutme", action: "addhomeaboutme" }, aboutMeAddModel);
  }

  getAboutMe(): Observable<AboutMeModel> {
    return this.httpClientService.get<AboutMeModel>({ controller: "aboutme" });
  }

  getAboutMeWithImage(): Observable<AboutMeWithImageModel> {
    return this.httpClientService.get<AboutMeWithImageModel>({ controller: "aboutme", action: "getaboutmewithimage" });
  }

}
