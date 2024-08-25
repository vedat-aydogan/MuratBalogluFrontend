import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { TokenResponse } from '../../../contracts/token/token-response';
import { Observable, firstValueFrom } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../custom-toastr-service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomToastrService
  ) { }

  login(userNameOrEmail: string, password: string): Observable<TokenResponse> {
    return this.httpClientService.post<TokenResponse>({ controller: "auth", action: "login" }, { userNameOrEmail, password });
  }

  async loginAsync(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<TokenResponse> = this.httpClientService.post<TokenResponse>({ controller: "auth", action: "login" }, { userNameOrEmail, password });

    const tokenResponse: TokenResponse = await firstValueFrom(observable);

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);

      this.toastrService.message("Hoşgeldiniz.", "Giriş başarılı.", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopCenter,
        timeOut: 2000
      });
    }

    callBackFunction();
  }

  refreshTokenLogin(refreshToken: string): Observable<TokenResponse> {
    return this.httpClientService.post<TokenResponse>({ controller: "auth", action: "refreshtokenlogin" }, { refreshToken });
  }

  async refreshTokenLoginAsync(refreshToken: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<TokenResponse> = this.httpClientService.post<TokenResponse>({ controller: "auth", action: "refreshtokenlogin" }, { refreshToken });

    const tokenResponse: TokenResponse = await firstValueFrom(observable);
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
    }

    // callBackFunction();
  }

  async refreshTokenLoginAlternativeAsync(refreshToken: string): Promise<TokenResponse> {
    const observable: Observable<TokenResponse> = this.httpClientService.post<TokenResponse>({ controller: "auth", action: "refreshtokenlogin" }, { refreshToken });

    return await firstValueFrom(observable);

    // const tokenResponse: TokenResponse = await firstValueFrom(observable);
    // if (tokenResponse) {
    //   console.log("tokenResponse var", tokenResponse);
    //   localStorage.setItem("accessToken", tokenResponse.token.accessToken);
    //   localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
    // } else {
    //   console.log("tokenResponse yok", tokenResponse);
    //   this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    //   this.alertifyService.message("Yetkisiz Erişim. Giriş yapmanız gerekiyor", {
    //     dismissOthers: true,
    //     messageType: MessageType.Warning,
    //     position: Position.TopCenter,
    //     delay: 4
    //   });
    // }
  }

}
