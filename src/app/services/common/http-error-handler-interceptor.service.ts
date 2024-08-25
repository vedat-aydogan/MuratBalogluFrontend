import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserAuthService } from './models/user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './custom-toastr-service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private userAuthService: UserAuthService,
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.userAuthService.refreshTokenLoginAsync(localStorage.getItem("refreshToken")).then(data => {
            this.spinnerService.hide();

            this.toastrService.message("Lütfen aynı işlemi tekrar deneyiniz.", "Zaman Aşımı. Tekrar yetkilendirildiniz!", {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopCenter,
              timeOut: 6000
            });
          });
          break;

        case HttpStatusCode.InternalServerError:
          this.spinnerService.hide();

          this.toastrService.message(error.error.message, "Hata!", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter,
            timeOut: 6000
          });
          break;

        case HttpStatusCode.Forbidden:
          this.spinnerService.hide();

          this.toastrService.message(error.error.message, "Bu işlemi yapma yetkiniz yok!", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter,
            timeOut: 6000
          });
          break;

        // default:
        //   this.alertifyService.message("default", {
        //     dismissOthers: true,
        //     messageType: MessageType.Success,
        //     position: Position.BottomCenter
        //   });
        //   break;
      }

      return throwError(() => error);
    }));
  }

}
