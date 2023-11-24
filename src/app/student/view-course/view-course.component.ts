import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseKitModel } from '@core/models/course.model';
import { CommonService } from '@core/service/common.service';
import { CourseService } from '@core/service/course.service';
import { StudentVideoPlayerComponent } from 'app/admin/courses/course-kit/student-video-player/student-video-player.component';
import { VideoPlayerComponent } from 'app/admin/courses/course-kit/video-player/video-player.component';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { local } from 'd3';
import {  BsModalService, ModalOptions} from "ngx-bootstrap/modal";

import Swal from 'sweetalert2';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
 
];
@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent {
  @ViewChild('video', { static: false }) video!: ElementRef;

  displayedColumns: string[] = ['position', ' Class Start Date ', ' Class End Date ', 'action'];
  displayedColumns1: string[] = [
    'Course Name',
    'Short Description',
    'Video Link',
    'Document Link',
    'Completed'
    ];
  dataSource:any;
  currentPlaybackProgress: number = 0;
  playbackProgress: number = 0; // Add this line to define the property


  courseKitModel!: Partial<CourseKitModel>;
  templates: any[] = [];
  currentDate!: Date;
  breadscrums = [
    {
      title: 'Courses',
      items: ['Course'],
      active: 'View Details',
    },
  ];
  isRegistered = false;
  subscribeParams: any;
  classId: any;
  classDetails: any;
  courseId: any;
  courseKitDetails:any;
  studentClassDetails: any;
  isStatus = false;
  isApproved = false
  isCancelled = false;
  isCompleted = false
  documentLink: any;
  uploadedDoc: any;
  title!: string;
  videoStatus!: string;
  courseCompleted = false;
  certificateIssued = false;

  constructor(private classService: ClassService,private activatedRoute:ActivatedRoute,private modalServices:BsModalService, private courseService:CourseService,
    @Inject(DOCUMENT) private document: any,private commonService: CommonService){
    this.subscribeParams = this.activatedRoute.params.subscribe((params) => {
      this.classId = params["id"];
    });
    localStorage.setItem('classId',this.classId)
    this.getRegisteredClassDetails();
    this.getClassDetails();
    this.getVideoPlayed();
  

  }
  getClassDetails(){
    this.classService.getClassById(this.classId).subscribe((response)=>{
      this.classDetails =response;
      this.courseId=this.classDetails.courseId.id
      this.dataSource=this.classDetails.sessions;
      this.getCourseKitDetails();
    })
  }
  getVideoPlayed(){
    let studentId = localStorage.getItem('id')
    this.courseService.getVideoPlayedById(studentId,this.classId).subscribe((response)=>{
      let videoPlayed =response;
      this.videoStatus = response?.status
      if(this.videoStatus == 'ended'){
        this.courseCompleted = true
      }
    })
  }

  registerClass(classId: string) {
    let userdata = JSON.parse(localStorage.getItem('currentUser')!)
    let studentId=localStorage.getItem('id')
    let payload ={
      email:userdata.user.email,
      name:userdata.user.name,
      courseTitle:this.classDetails?.courseId?.title,
      courseFee:this.classDetails?.courseId?.fee,
      studentId:studentId,
      classId:this.classId,
      title:this.title
    }
    this.courseService.saveRegisterClass(payload).subscribe((response) => {
      this.document.location.href = response.data.session.url;
      this.getClassDetails();
    });
  }
  getCourseKitDetails(){
    this.courseService.getCourseById(this.courseId).subscribe((response) => {
      this.courseKitDetails=response?.course_kit;
      this.documentLink = this.courseKitDetails[0].documentLink;
      let uploadedDocument=this.documentLink?.split('/')
      this.uploadedDoc = uploadedDocument?.pop();
      this.title = response?.title;
    });
  }
  getRegisteredClassDetails(){
    let studentId=localStorage.getItem('id')
    this.courseService.getStudentClass(studentId,this.classId).subscribe((response) => {
      this.studentClassDetails=response.data.docs[0];
      this.commonService.setPlayBackTime(this.studentClassDetails?.playbackTime)
      if(this.studentClassDetails.status =='registered' ){
        this.isRegistered == true;
        this.isStatus=true;
      }
      if(this.studentClassDetails.status =='approved' ){
        this.isRegistered == true;
        this.isApproved=true;
      }
      if(!this.studentClassDetails.certifiacteUrl && this.studentClassDetails.status =='completed' ){
        this.isRegistered == true;
        this.isCompleted=true;
      }
      if(this.studentClassDetails.certifiacteUrl && this.studentClassDetails.status =='completed' ){
        this.isRegistered == true;
        this.isCompleted=true;
        this.certificateIssued = true;
      }


      if(this.studentClassDetails.status =='cancel' ){
        this.isRegistered == true;
        this.isCancelled=true;
      }
    });
  }
  getJobTemplates() {
    this.courseService.getJobTempletes().subscribe(
      (data: any) => {
        this.templates = data.templates;
      },
      (error) => {
        console.error('Error fetching job templates:', error);
      }
    );
  }

  playVideo(video: { url: any, playbackProgress: number }): void {
    if (video?.url) {
      this.openVidePlayer(video);
    } else {
      console.error("Invalid video URL");
    }
  }

  openVidePlayer(videoLink: { url?: any; id?: any;playbackProgress?: number  }): void {
    if (videoLink?.url?.id) {
      const videoId = videoLink.url.id;
      this.courseService.getVideoById(videoId).subscribe((res) => {
        const videoURL = res.data.videoUrl;
        if (!videoURL) {
          Swal.fire({
            icon: "error",
            title: "Video Convert is Pending",
            text: "Please start convert this video",
          });
          return
          
        }
        const videoType = "application/x-mpegURL";
        if (videoURL) {
          const initialState: ModalOptions = {
            initialState: {
              videoURL,
              videoType,
              playbackProgress: videoLink.playbackProgress || 0, // Default to 0 if not provided

            },
            class: "videoPlayer-modal",
          };
          this.modalServices.show(StudentVideoPlayerComponent, initialState);
        }
      });
    }
  }
    
  parseDate(dateString: string): Date {
    return new Date(dateString);
  }
}
