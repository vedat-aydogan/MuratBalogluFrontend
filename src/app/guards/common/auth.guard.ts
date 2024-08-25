import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr-service';

export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  // const alertifyService = inject(AlertifyService);
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastrService = inject(CustomToastrService);

  // spinnerService.show();

  authService.identityCheck();

  //otantike değilse bu işlemleri yap
  if (!_isAuthenticated) {
    await router.navigate(["login"], { queryParams: { returnUrl: state.url } });

    toastrService.message("Lütfen tekrar giriş yapınız.", "Yetkisiz Erişim!", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopCenter,
      timeOut: 4000
    });

    // alertifyService.message("Yetkisiz Erişim yada Zaman Aşımı. Lütfen tekrar giriş yapınız.", {
    //   dismissOthers: true,
    //   messageType: MessageType.Warning,
    //   position: Position.TopCenter,
    //   delay: 4
    // });
  }

  //otantike değilse bu işlemleri yap
  // if (!_isAuthenticated) {
  //   console.log("guard _isAuthenticatedFalse", _isAuthenticated);
  //   let tokenResponse: TokenResponse;
  //   console.log(tokenResponse);
  //   try {
  //     tokenResponse = await userAuthService.refreshTokenLoginAsync(localStorage.getItem("refreshToken"));
  //     console.log(tokenResponse);
  //     if (tokenResponse) {
  //       console.log("guard tokenResponse var", tokenResponse);
  //       localStorage.setItem("accessToken", tokenResponse.token.accessToken);
  //       localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
  //       authService.identityCheck();
  //       console.log("guard tokenResponse var");
  //     }
  //   } catch {
  //     if (HttpStatusCode.Unauthorized) {
  //       console.log("guard error 1", tokenResponse);
  //       await router.navigate(["login"], { queryParams: { returnUrl: state.url } });
  //       alertifyService.message("Yetkisiz Erişim. Giriş yapmanız gerekiyor", {
  //         dismissOthers: true,
  //         messageType: MessageType.Warning,
  //         position: Position.TopCenter,
  //         delay: 4
  //       });
  //       console.log("guard error 2", tokenResponse);
  //     }
  //   }

  // }

  // spinnerService.hide();

  return true;
};