import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../../../services/common/models/video.service';
import { VideoModel } from '../../../../../contracts/models/video-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-videos-section',
  templateUrl: './videos-section.component.html',
  styleUrl: './videos-section.component.css'
})
export class VideosSectionComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  videos: VideoModel[];

  getLastNineVideo(): void {
    this.videoService.getLastNineVideo().subscribe({
      next: (data: VideoModel[]) => {
        this.videos = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getLastNineVideo();
  }

}
