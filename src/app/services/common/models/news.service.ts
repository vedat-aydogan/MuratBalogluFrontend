import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { NewsWithCardImageModel } from '../../../contracts/models/news-with-card-image-model';
import { Observable } from 'rxjs';
import { NewsAddModel } from '../../../contracts/models/news-add-model';
import { NewsModel } from '../../../contracts/models/news-model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClientService: HttpClientService) { }

  addNews(newsAddModel: NewsAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "news" }, newsAddModel);
  }

  getNewsWithCardImage(): Observable<NewsWithCardImageModel[]> {
    return this.httpClientService.get<NewsWithCardImageModel[]>({ controller: "news", action: "getnewswithcardimage" });
  }

  updateNews(newsModel: NewsModel): Observable<any> {
    return this.httpClientService.put<any>({ controller: "news" }, newsModel);
  }

  deleteNews(id: string): Observable<any> {
    return this.httpClientService.delete<any>({ controller: "news" }, id);
  }
}
