import { ChangeDetectorRef, Component, afterNextRender } from '@angular/core';
import { AuthService } from './services/common/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  //html tarafinda AuthService deki property e ulaşmak istersek servisi public olarak işaretle.
  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {
    //this will only run in the browser, not the server.
    //SSR dan dolayi bu fonksiyonu kullandik. Kullanmadigimizda 'Local storage is not defined' hatasi veriyordu.
    afterNextRender(() => {
      // Promise.resolve().then(() => authService.identityCheck()); //Çalışıyor      
      this.authService.identityCheck();
      this.cd.detectChanges();
    });
  }

  title = 'Op. Dr. Murat Baloğlu';

}
