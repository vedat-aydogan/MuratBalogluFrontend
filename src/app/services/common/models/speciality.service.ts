import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { Observable } from 'rxjs';
import { SpecialityAddModel } from '../../../contracts/models/speciality-add-model';
import { SpecialityModel } from '../../../contracts/models/speciality-model';
import { SpecialityWithCardImageModel } from '../../../contracts/models/speciality-with-card-image-model';
import { SpecialityDetailModel } from '../../../contracts/models/speciality-detail-model';
import { TitleAndDetailUrlModel } from '../../../contracts/models/common/title-and-detail-url-model';
import { SpecialityCategoryAddModel } from '../../../contracts/models/speciality-category-add-model';
import { SpecialityCategoryModel } from '../../../contracts/models/speciality-category-model';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private httpClientService: HttpClientService) { }

  addSpeciality(specialityAddModel: SpecialityAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "specialties" }, specialityAddModel);
  }

  getSpecialties(): Observable<SpecialityModel[]> {
    return this.httpClientService.get<SpecialityModel[]>({ controller: "specialties" });
  }

  deleteSpeciality(id: string): Observable<any> {
    return this.httpClientService.delete<any>({ controller: "specialties" }, id);
  }

  updateSpeciality(specialityModel: SpecialityModel): Observable<any> {
    return this.httpClientService.put<any>({ controller: "specialties" }, specialityModel);
  }

  getSpecialtiesWithCardImage(): Observable<SpecialityWithCardImageModel[]> {
    return this.httpClientService.get<SpecialityWithCardImageModel[]>({ controller: "specialties", action: "getspecialtieswithcardimage" });
  }

  getLastNineSpecialityWithCardImage(): Observable<SpecialityWithCardImageModel[]> {
    return this.httpClientService.get<SpecialityWithCardImageModel[]>({ controller: "specialties", action: "getlastninespecialitywithcardimage" });
  }

  getSpecialtiesByCategoryWithCardImage(categoryUrl: string): Observable<SpecialityWithCardImageModel[]> {
    return this.httpClientService.get<SpecialityWithCardImageModel[]>({ controller: "specialties", action: "getspecialtiesbycategorywithcardimage" }, categoryUrl);
  }

  getSpecialtiesByCategoryIdWithCardImage(categoryId: string): Observable<SpecialityWithCardImageModel[]> {
    return this.httpClientService.get<SpecialityWithCardImageModel[]>({ controller: "specialties", action: "getspecialtiesbycategoryidwithcardimage" }, categoryId);
  }

  getSpecialityDetail(id: string): Observable<SpecialityDetailModel> {
    return this.httpClientService.get<SpecialityDetailModel>({ controller: "specialties", action: "getspecialitydetail" }, id);
  }

  getSpecialityDetailByDetailUrl(detailUrl: string): Observable<SpecialityDetailModel> {
    return this.httpClientService.get<SpecialityDetailModel>({ controller: "specialties", action: "getspecialitydetailbydetailurl" }, detailUrl);
  }

  getSpecialityTitlesAndDetailUrls(): Observable<TitleAndDetailUrlModel[]> {
    return this.httpClientService.get<TitleAndDetailUrlModel[]>({ controller: "specialties", action: "getspecialitytitlesanddetailurls" });
  }

  getSpecialityById(id: string): Observable<SpecialityModel> {
    return this.httpClientService.get<SpecialityModel>({ controller: "specialties", action: "getspecialitybyid" }, id);
  }

  addSpecialityCategory(specialityCategoryAddModel: SpecialityCategoryAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "specialties", action: "addspecialitycategory" }, specialityCategoryAddModel);
  }

  getSpecialityCategories(): Observable<SpecialityCategoryModel[]> {
    return this.httpClientService.get<SpecialityCategoryModel[]>({ controller: "specialties", action: "getspecialitycategories" });
  }

  deleteSpecialityCategory(id: string): Observable<any> {
    return this.httpClientService.delete<any>({ controller: "specialties", action: "deletespecialitycategory" }, id);
  }

  updateSpecialityCategory(specialityCategoryModel: SpecialityCategoryModel): Observable<any> {
    return this.httpClientService.put<any>({ controller: "specialties", action: "updatespecialitycategory" }, specialityCategoryModel);
  }

}
