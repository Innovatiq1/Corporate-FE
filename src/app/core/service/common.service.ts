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

  private playBackTime!: number;

  setPlayBackTime(time: number) {
    this.playBackTime = time;
  }

  getPlayBackTime() {
    return this.playBackTime;
  }

  private videoDetails: any;

  setVideoDetails(video: any) {
    this.videoDetails = video;
  }

  getVideoDetails() {
    return this.videoDetails;
  }

  private completedPercentage!: number;

  setCompletedPercentage(time: number) {
    this.completedPercentage = time;
  }

  getCompletedPercentage() {
    return this.completedPercentage;
  }



}
