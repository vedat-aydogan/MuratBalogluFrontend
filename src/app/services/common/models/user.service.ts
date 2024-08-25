import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { User } from '../../../entities/user';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUserResponse } from '../../../contracts/user/create-user-response';
import { UserModel } from '../../../contracts/user/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  createUser(user: User): Observable<CreateUserResponse> {
    return this.httpClientService.post<CreateUserResponse>({ controller: "users" }, user);
  }

  getUsers(): Observable<UserModel[]> {
    return this.httpClientService.get<UserModel[]>({ controller: "users" });
  }

  async getUsersAsync(successCallBack?: () => void, errorCallback?: (error) => any): Promise<UserModel[]> {
    const observable: Observable<UserModel[]> = this.httpClientService.get<UserModel[]>({ controller: "users" });

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack()).catch(error => errorCallback(error));
    return await promiseData;
  }

  async assignRoleToUserAsync(roles: string[], userId: string, successCallBack?: () => void, errorCallback?: (error) => any) {
    const observable: Observable<any> = this.httpClientService.post<any>(
      { controller: "users", action: "assign-role-to-user" },
      { roles: roles, userId: userId }
    );

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack()).catch(error => errorCallback(error));

    await promiseData;
  }

  async getRolesOfUserAsync(userId: string, successCallBack?: () => void, errorCallback?: (error) => any): Promise<string[]> {
    const observable: Observable<{ userRoles: string[] }> = this.httpClientService.get<{ userRoles: string[] }>(
      { controller: "users", action: "get-roles-of-user" }, userId
    );

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack()).catch(error => errorCallback(error));

    return (await promiseData).userRoles;
  }

  updateUser(userModel: UserModel): Observable<any> {
    return this.httpClientService.put<any>({ controller: "users", action: "update-user" }, userModel);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClientService.delete<any>({ controller: "users" }, id);
  }

}
