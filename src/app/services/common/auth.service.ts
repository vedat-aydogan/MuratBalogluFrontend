import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  //Bu fonksiyon tetiklendikçe _isAuthenticated daki değer güncellenecek.
  identityCheck(): void {
    const token: string = localStorage.getItem("accessToken");

    //Token gerçek bir tokensa ve süresi dolmamışsa(expire değilse) kontrolü yapılıyor.
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    }
    catch {
      expired = true;
    }

    //token null değilse ve expired olmamışsa
    _isAuthenticated = token != null && !expired;
  }

  async identityCheckAsync(): Promise<void> {
    const token: string = localStorage.getItem("accessToken");

    //Token gerçek bir tokensa ve süresi dolmamışsa(expire değilse) kontrolü yapılıyor.
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    }
    catch {
      expired = true;
    }

    //token null değilse ve expired olmamışsa
    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }

}

export let _isAuthenticated: boolean;
