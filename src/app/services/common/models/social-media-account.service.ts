import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { SocialMediaAccountAddModel } from '../../../contracts/models/social-media-account-add-model';
import { Observable } from 'rxjs';
import { SocialMediaAccountModel } from '../../../contracts/models/social-media-account-model';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaAccountService {

  constructor(private httpClientService: HttpClientService) { }

  addSocialMediaAccount(socialMediaAccountAddModel: SocialMediaAccountAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "socialmediaaccounts" }, socialMediaAccountAddModel);
  }

  getSocialMediaAccounts(): Observable<SocialMediaAccountModel> {
    return this.httpClientService.get<SocialMediaAccountModel>({ controller: "socialmediaaccounts" });
  }

  updateSocialMediaAccount(socialMediaAccountModel: SocialMediaAccountModel): Observable<any> {
    return this.httpClientService.put<any>({ controller: "socialmediaaccounts" }, socialMediaAccountModel);
  }

}
