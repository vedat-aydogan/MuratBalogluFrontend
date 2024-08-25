import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService: HttpClientService) { }

  async assignRoleToEndpointAsync(roles: string[], code: string, menu: string, successCallBack?: () => void, errorCallback?: (error) => any) {
    const observable: Observable<any> = this.httpClientService.post<any>(
      { controller: "authorizationendpoints" },
      { roles: roles, code: code, menu: menu }
    );

    const data = observable.subscribe({
      next: successCallBack,
      error: errorCallback
    });

    await data;
  }

  async getRolesOfEndpointAsync(code: string, menuName: string, successCallBack?: () => void, errorCallback?: (error) => any): Promise<any> {
    const observable: Observable<any> = this.httpClientService.post<any>(
      { controller: "authorizationendpoints", action: "get-roles-of-endpoint" },
      { code: code, menuName: menuName }
    );

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack()).catch(error => errorCallback(error));

    return await promiseData;
  }
}
