import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/common/models/news.service';
import { NewsWithCardImageModel } from '../../../contracts/models/news-with-card-image-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {

  constructor(private newsService: NewsService) { }

  newsWithCardImageList: NewsWithCardImageModel[];

  getNewsWithCardImage() {
    this.newsService.getNewsWithCardImage().subscribe({
      next: (data: NewsWithCardImageModel[]) => {
        this.newsWithCardImageList = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getNewsWithCardImage();
  }
}
