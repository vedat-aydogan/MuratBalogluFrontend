import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  //Bu fonksiyonu daha sonra mutlaka observable bir fonksiyona dönüştür ve geriye observable döndürsün.
  reload(): boolean {
    let currentRouteUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRouteUrl]);
    });

    return true;
  }

  async reloadAsync(): Promise<boolean> {
    let currentRouteUrl = this.router.url;
    await this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRouteUrl]);
    });

    return true;
  }

  //Bunuda kullanabiliriz.
  // async reload(): Promise<boolean> {
  //   const currentRouteUrl = this.router.url;
  //   await this.router.navigateByUrl('/', { skipLocationChange: true });
  //   return this.router.navigateByUrl(currentRouteUrl);
  // }

  //Bunu denemedim
  // async reload(url: string): Promise<boolean> {
  //   await this.router.navigateByUrl('.', { skipLocationChange: true });
  //   return this.router.navigateByUrl(url);
  // }

}
