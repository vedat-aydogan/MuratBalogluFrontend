import { Component } from '@angular/core';
import { AuthService } from '../../../../services/common/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public authService: AuthService
    // private router: Router,
  ) { }

  //Oturumu kapat/Çıkış Yap
  signOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.authService.identityCheck();

    //Oturum kapatıldığında anasayfaya yönlendir. Bunu link üzerinden yaptık. Bu şekildede yapılabilinir.
    // this.router.navigate(["/login"]);
  }

}
