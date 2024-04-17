import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/common/models/blog.service';
import { BlogWithCardImageModel } from '../../../contracts/models/blog-with-card-image-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  blogWithCardImage: BlogWithCardImageModel[];

  getBlogsWithCardImage(): void {
    this.blogService.getBlogsWithCardImage().subscribe({
      next: (data: BlogWithCardImageModel[]) => {
        this.blogWithCardImage = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getBlogsWithCardImage();
  }

}

