import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { RoleModel } from '../../../contracts/models/role-model';
import { firstValueFrom, Observable } from 'rxjs';
import { RoleAddModel } from '../../../contracts/models/role-add-model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService: HttpClientService) { }

  addRole(roleAddModel: RoleAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "roles" }, roleAddModel);
  }

  async addRoleAsync(roleAddModel: RoleAddModel, successCallBack?: (response) => any, errorCallback?: (error) => any) {
    const observable: Observable<any> = this.httpClientService.post<any>({ controller: "roles" }, roleAddModel);

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack)
      .catch(errorCallback);

    return await promiseData as { succeeded: boolean }
  }

  getRoles(): Observable<RoleModel[]> {
    return this.httpClientService.get<RoleModel[]>({ controller: "roles" });
  }

  async getRolesAsync(successCallBack?: () => void, errorCallback?: (error) => any) {
    const observable: Observable<RoleModel[]> = this.httpClientService.get<RoleModel[]>({ controller: "roles" });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }

  getRoleById(id: string): Observable<RoleModel> {
    return this.httpClientService.get<RoleModel>({ controller: "roles", action: "getrolebyidasync" }, id);
  }

  deleteRole(id: string): Observable<any> {
    return this.httpClientService.delete<any>({ controller: "roles" }, id);
  }

  updateRole(roleModel: RoleModel): Observable<any> {
    return this.httpClientService.put<any>({ controller: "roles", action: "updateroleasync" }, roleModel);
  }
}
