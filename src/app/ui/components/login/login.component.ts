import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) { }

  loginForm: FormGroup;
  submitted: boolean;

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userNameOrEmail: ["", [Validators.required, Validators.email, Validators.maxLength(250)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
    });
  }

  //Bu bir property idir. component.controlName şeklinde kullanılır. Kullanabilmek için; "noPropertyAccessFromIndexSignature": false yapıldı.
  get component() {
    return this.loginForm.controls;
  }

  async loginAsync(data: { userNameOrEmail, password }) {
    this.submitted = true;
    if (this.loginForm.invalid)
      return;

    this.spinnerService.show();

    await this.userAuthService.loginAsync(data.userNameOrEmail, data.password, () => {
      this.authService.identityCheck();
      //Eğer login olurken bir query string varsa, login olduktan sonra o sayfaya gidebilmek için query parametresini elde ederiz ve oraya gideriz.
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl) {
          //Sayfa yenilemesi yapmasak açılır menüye tıkladığımızda site anasayfasına yönlendirme oluyordu. Buradaki if blogu bu yüzden kullanılmıştır.
          if (returnUrl == "/admin") {
            this.router.navigate([returnUrl]).then(() => {
              // alertfy mesajın gösterilmesini istiyorsak bu yapıyı kullan
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            });
          }
          this.router.navigate([returnUrl]);
        } else {
          //Sayfa yenilemesi yapmasak açılır menüye tıkladığımızda site anasayfasına yönlendirme oluyordu. Buradaki else blogu bu yüzden kullanılmıştır.
          this.router.navigate(["admin"]).then(() => {
            // alertfy mesajın gösterilmesini istiyorsak bu yapıyı kullan
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });

        }
      });

      this.spinnerService.hide();
    });
  }

  // login(data: { userNameOrEmail, password }) {
  //   this.submitted = true;
  //   if (this.loginForm.invalid)
  //     return;

  //   this.spinnerService.show();
  //   console.log("login start");
  //   this.userAuthService.login(data.userNameOrEmail, data.password).subscribe({
  //     next: (data: TokenResponse) => {
  //       console.log("login next 1");
  //       if (data) {
  //         console.log("login next 2");
  //         localStorage.setItem("accessToken", data.token.accessToken);
  //         localStorage.setItem("refreshToken", data.token.refreshToken);

  //         this.spinnerService.hide();

  //         this.alertifyService.message("Giriş başarılı. Hoşgeldiniz.", {
  //           dismissOthers: true,
  //           messageType: MessageType.Success,
  //           position: Position.TopCenter,
  //           delay: 4
  //         });
  //         console.log("login next 3");
  //       }
  //       console.log("login next 4");
  //       this.authService.identityCheck();
  //       console.log("login next 5");
  //       //Eğer login olurken bir query string varsa, login olduktan sonra o sayfaya gidebilmek için query parametresini elde ederiz ve oraya gideriz.
  //       this.activatedRoute.queryParams.subscribe(params => {
  //         const returnUrl: string = params["returnUrl"];
  //         if (returnUrl) {
  //           this.router.navigate([returnUrl]);
  //           console.log("login next 6");
  //         } else {
  //           this.router.navigate(["admin"]).then(() => window.location.reload());
  //           console.log("login next 7");
  //         }
  //       });
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.log("login error 1");
  //       this.spinnerService.hide();
  //       console.log("login error 2");

  //       this.alertifyService.message(error.error.message, {
  //         dismissOthers: true,
  //         messageType: MessageType.Error,
  //         position: Position.TopCenter,
  //         delay: 4
  //       });
  //       console.log("login error 3");
  //     }
  //   });
  //   console.log("login last");
  // }

  ngOnInit(): void {
    this.createLoginForm();
  }

}
