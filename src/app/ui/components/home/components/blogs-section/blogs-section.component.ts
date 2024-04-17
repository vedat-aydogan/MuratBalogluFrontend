import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../../../services/common/models/blog.service';
import { BlogWithCardImageModel } from '../../../../../contracts/models/blog-with-card-image-model';
import { HttpErrorResponse } from '@angular/common/http';

// declare var $: any; //Jquery kullanmak istediğimiz her yerde bu şekilde kullanabiliriz. 

@Component({
  selector: 'app-blogs-section',
  templateUrl: './blogs-section.component.html',
  styleUrl: './blogs-section.component.css'
})
export class BlogsSectionComponent implements OnInit {

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
