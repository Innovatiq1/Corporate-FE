import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private videoId!: string;

  setVideoId(id: string) {
    this.videoId = id;
  }

  getVideoId() {
    return this.videoId;
  }

  private progressArray: any[] = [];

  getProgressArray(): any[] {
    return this.progressArray;
  }

  setProgress(progress: any): void {
    this.progressArray=progress
  }
}
