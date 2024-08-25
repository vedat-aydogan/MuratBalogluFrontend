import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { Menu } from '../../../contracts/application-configurations/menu';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService: HttpClientService) { }

  async getAuthorizeDefinitionEndpointsAsync(successCallBack?: () => void, errorCallback?: (error) => any): Promise<Menu[]> {
    const observable: Observable<Menu[]> = this.httpClientService.get<Menu[]>({
      controller: "applicationservices"
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack()).catch(error => errorCallback(error));

    return await promiseData;

    // const observable: Observable<Menu[]> = this.httpClientService.get<Menu[]>({
    //   controller: "applicationservices"
    // });

    // return await firstValueFrom(observable);    
  }
}
