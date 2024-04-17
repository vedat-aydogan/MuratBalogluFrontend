import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { VideoAddModel } from '../../../contracts/models/video-add-model';
import { Observable } from 'rxjs';
import { VideoModel } from '../../../contracts/models/video-model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClientService: HttpClientService, private sanitizer: DomSanitizer) { }

  addVideo(videoAddModel: VideoAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "videos" }, videoAddModel);
  }

  getVideos(): Observable<VideoModel[]> {
    return this.httpClientService.get<VideoModel[]>({ controller: "videos" });
  }

  deleteVideo(id: string): Observable<any> {
    return this.httpClientService.delete<any>({ controller: "videos" }, id);
  }

  updateVideo(videoModel: VideoModel): Observable<any> {
    return this.httpClientService.put<any>({ controller: "videos" }, videoModel);
  }

  getLastNineVideo(): Observable<VideoModel[]> {
    return this.httpClientService.get<VideoModel[]>({ controller: "videos", action: "getlastninevideo" });
  }

  safeHtml(iframe: string) {
    return this.sanitizer.bypassSecurityTrustHtml(iframe);
  }
}
