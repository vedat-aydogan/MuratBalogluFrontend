import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/common/models/video.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VideoModel } from '../../../contracts/models/video-model';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  videos: VideoModel[];

  getVideos(): void {
    this.videoService.getVideos().subscribe({
      next: (data: VideoModel[]) => {
        this.videos = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getVideos();
  }

}
