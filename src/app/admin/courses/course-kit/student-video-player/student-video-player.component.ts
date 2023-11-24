import { Component, Input, OnInit, ViewChild, ElementRef } from "@angular/core";
import Hls from "hls.js";
import { BsModalRef } from "ngx-bootstrap/modal";
import * as Plyr from "plyr";
import { environment } from "environments/environment";
import { CourseService } from "@core/service/course.service";
import { ClassService } from "app/admin/schedule-class/class.service";
import { CommonService } from "@core/service/common.service";

@Component({
  selector: 'app-student-video-player',
  templateUrl: './student-video-player.component.html',
  styleUrls: ['./student-video-player.component.scss']
})
export class StudentVideoPlayerComponent {
  @Input()
  videoURL: string="";
  @Input() videoType: string = "application/x-mpegURL";
  signedUrl: string = "";
  private player!: Plyr;
  array: number[] = [];


  private videoEnded = false;

  private hls = new Hls();

  @ViewChild("video", { static: true }) video: ElementRef<HTMLVideoElement> =
    {} as ElementRef<HTMLVideoElement>;

  constructor(
    public bsModalRef: BsModalRef,private courseService: CourseService,private classService: ClassService,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    if (this.videoURL) this.initPlayer(this.videoURL);
    
  }

  initPlayer(currentVideo: string) {
    if (Hls.isSupported()) {
      this.loadVideoWithHLS(currentVideo);
    } else {
      if (
        this.video.nativeElement.canPlayType("application/vnd.apple.mpegurl")
      ) {
        this.loadVideo(currentVideo);
      }
    }
  }

  private loadVideo(currentVideo: string) {
    this.video.nativeElement.src = currentVideo;
  }

  private loadVideoWithHLS(currentVideo: string) {
    this.hls.config.xhrSetup = async function xhrSetup(xhr, url) {
      const urlString = new URL(url);
      const baseURL = urlString.href.split("?")[0];
      const signedURL: string = await new Promise((resolve, reject) => {
        let xhrSigned = new XMLHttpRequest();
        const key = url;
        const apiURL = environment.apiUrl;
        const userObject = localStorage.getItem("user_data");
        if(userObject){
        const user = JSON.parse(userObject);
        xhrSigned.open(
          "GET",
          `${apiURL}admin/video/signed/url?url=${encodeURIComponent(key)}`
        );
        xhrSigned.responseType = "json";
        xhrSigned.setRequestHeader("Authorization", `JWT ${user.token}`);
        xhrSigned.send();

        xhrSigned.onload = function () {
          if (xhrSigned.status === 200) {
            let responseObj = xhrSigned.response;
            resolve(responseObj.data);
          } else {
            reject();
          }
        };
      }
      });
      xhr.open("GET", signedURL);
    };
    let defaultOptions: any = {};
    this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      const avlQuality = this.hls.levels.map((l) => l.height);
      defaultOptions.quality = {
        default: avlQuality[1],
        options: avlQuality,
        forced: true,
        onChange: (e: any) => this.updateQuality(e),
      };
      let time =this.commonService.getPlayBackTime();
     this.player =  new Plyr(this.video.nativeElement, defaultOptions);
    this.video.nativeElement.addEventListener('timeupdate', () => {
      const progress = (this.video.nativeElement.currentTime / this.video.nativeElement.duration) * 100;
      this.array.push(progress);
      this.commonService.setProgress(this.array);
    });
    this.video.nativeElement.addEventListener('loadedmetadata', () => {
      const initialPlaybackPosition = (time / 100) * this.video.nativeElement.duration;
      this.video.nativeElement.currentTime = initialPlaybackPosition;
        });
      this.video.nativeElement.addEventListener('ended', () => {
      let classId = localStorage.getItem('classId');
      let studentId = localStorage.getItem('id')
      this.courseService.getVideoPlayedById(studentId,classId).subscribe((response)=>{
        if(response){
        } else {
          let payload = {
            status:'ended',
            studentId:studentId,
            classId:classId
          }
          this.courseService.saveVideoPlayTime(payload).subscribe(
            () => {
              let payload ={
                status:'completed',
                studentId:studentId,
              }
              this.classService.saveApprovedClasses(classId,payload).subscribe((response)=>{
              })
            })    
  
        }
      })
  
    });

  });
    this.hls.attachMedia(this.video.nativeElement);
    this.hls.loadSource(currentVideo);
   ( window as any)["hls"] = this.hls;

  }

  updateQuality(newQuality: any) {
    ( window as any)["hls"].levels.forEach((level: { height: any; }, levelIndex: any) => {
      if (level.height === newQuality) {
        ( window as any)["hls"].currentLevel = levelIndex;
      }
    });
  }

  destroyModal(): void {
      const playBackTime = this.commonService.getProgressArray();
      let lastButOneValue = playBackTime[playBackTime.length - 1];
      let classId = localStorage.getItem('classId');
      let studentId = localStorage.getItem('id')
      let payload = {
        studentId:studentId,
        classId:classId,
        playbackTime:lastButOneValue
      }

      this.classService.saveApprovedClasses(classId,payload).subscribe((response)=>{
      })
  

    this.hls.destroy();
    this.bsModalRef.hide();
  }

}
