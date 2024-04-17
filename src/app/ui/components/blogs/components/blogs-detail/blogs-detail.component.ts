import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../../../../services/common/models/blog.service';
import { BlogDetailModel } from '../../../../../contracts/models/blog-detail-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-blogs-detail',
  templateUrl: './blogs-detail.component.html',
  styleUrl: './blogs-detail.component.css'
})
export class BlogsDetailComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  @Input() detailUrl: string;
  blogDetail: BlogDetailModel;

  urlChanged(detailUrl: string) {
    this.getBlogDetailByDetailUrl(detailUrl);
  }

  getBlogDetailByDetailUrl(detailUrl: string): void {
    this.blogService.getBlogDetailByDetailUrl(detailUrl).subscribe({
      next: (data: BlogDetailModel) => {
        this.blogDetail = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getBlogDetailByDetailUrl(this.detailUrl);
  }

}
