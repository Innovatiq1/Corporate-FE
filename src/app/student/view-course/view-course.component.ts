import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseKitModel } from '@core/models/course.model';
import { CommonService } from '@core/service/common.service';
import { CourseService } from '@core/service/course.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { local } from 'd3';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

import Swal from 'sweetalert2';
import { StudentVideoPlayerComponent } from './student-video-player/student-video-player.component';
import { Subject, takeUntil } from 'rxjs';
import * as Plyr from 'plyr';
import { T } from '@angular/cdk/keycodes';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StudentsService } from 'app/admin/students/students.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
];
@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss'],
})
export class ViewCourseComponent implements OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  displayedColumns: string[] = [
    'position',
    ' Class Start Date ',
    ' Class End Date ',
    'action',
  ];
  displayedColumns1: string[] = ['video'];
  dataSource: any;
  currentPlaybackProgress: number = 0;
  playbackProgress: number = 0; // Add this line to define the property
  questionForm!: FormGroup;
  //video
  isPlaying = false;
  lastPausedAt: number = 0;

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
  array: number[] = [];
  isRegistered = false;
  subscribeParams: any;
  classId: any;
  classDetails: any;
  courseId: any;
  courseKitDetails: any;
  studentClassDetails: any;
  isStatus = false;
  isApproved = false;
  isCancelled = false;
  isCompleted = false;
  documentLink: any;
  uploadedDoc: any;
  title!: string;
  private player!: Plyr;
  videoStatus!: string;
  courseCompleted = false;
  certificateIssued = false;
  courseKit: any[] = [];
  viPath = 'assets/sample.mp4';
  videoData: any;
  videosrc!: string;
  header!: string;
  coursekitDetails: any;
  playBackTime!: number;
  duration!: number;
  currentVideoIndex = 0;
  private unsubscribe$ = new Subject<void>();
  sdiscrption!: string;
  url: any;
  longDescription: any;
  assessmentInfo!: any;
  isAnswersSubmitted: boolean = false;
  questionList: any = [];
  answersResult!: any;
  feedbackInfo!: any;
  constructor(
    private classService: ClassService,
    private activatedRoute: ActivatedRoute,
    private modalServices: BsModalService,
    private courseService: CourseService,
    @Inject(DOCUMENT) private document: any,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private studentService: StudentsService
  ) {
    this.subscribeParams = this.activatedRoute.params.subscribe((params) => {
      this.classId = params['id'];
    });
    localStorage.setItem('classId', this.classId);
    this.commonService.notifyVideoObservable$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.getRegisteredClassDetails();
      });
    this.getRegisteredClassDetails();
    this.getClassDetails();
  }
  getClassDetails() {
    this.classService.getClassById(this.classId).subscribe((response) => {
      this.classDetails = response;
      this.courseId = this.classDetails.courseId.id;
      this.dataSource = this.classDetails.sessions;
      this.getCourseKitDetails();
    });
  }
  // getVideoPlayed(){
  //   let studentId = localStorage.getItem('id')
  //   this.courseService.getVideoPlayedById(studentId,this.classId).subscribe((response)=>{
  //     let videoPlayed =response;
  //     this.courseKitDetails.videoLinktatus = response?.status
  //     if(this.courseKitDetails.videoLinktatus == 'ended'){
  //       this.courseCompleted = true
  //     }
  //   })
  // }

  // Listen for the time update event to save current time
  onTimeUpdate(event: any) {
    let time = this.commonService.getPlayBackTime();
    this.videoPlayer.nativeElement.addEventListener('timeupdate', () => {
      const progress =
        (this.videoPlayer.nativeElement.currentTime /
          this.videoPlayer.nativeElement.duration) *
        100;
      this.array.push(progress);
      // console.log("gettime:array: " + this.array);
      this.commonService.setProgress(this.array);
    });
    this.videoPlayer.nativeElement.addEventListener('loadedmetadata', () => {
      const initialPlaybackPosition =
        (time / 100) * this.videoPlayer.nativeElement.duration;

      this.videoPlayer.nativeElement.currentTime = initialPlaybackPosition;
    });

    this.videoPlayer.nativeElement.addEventListener('ended', () => {
      let classId = localStorage.getItem('classId');
      let studentId = localStorage.getItem('id');
      const videoDetails = this.commonService.getVideoDetails();
      this.courseService
        .getVideoPlayedById(studentId, classId, videoDetails.id)
        .subscribe((response) => {
          if (response) {
          } else {
            let payload = {
              status: 'ended',
              studentId: studentId,
              classId: classId,
              videoId: videoDetails.id,
            };

            this.courseService.saveVideoPlayTime(payload).subscribe(() => {
              this.courseService
                .getStudentClass(studentId, classId)
                .subscribe((response) => {
                  this.studentClassDetails = response.data.docs[0].coursekit;
                  // console.log("payload",response)
                  if (
                    this.studentClassDetails.playbackTime !== 100 ||
                    !this.studentClassDetails.playbackTime
                  ) {
                    const unmatchedDocuments = this.studentClassDetails.filter(
                      (doc: { videoId: any }) => doc.videoId !== videoDetails.id
                    );
                    const allUnmatchedCompleted = unmatchedDocuments.every(
                      (doc: { playbackTime: number }) =>
                        doc.playbackTime === 100
                    );
                    // console.log("reached",allUnmatchedCompleted);
                    if (allUnmatchedCompleted) {
                      this.courseService
                        .getStudentClass(studentId, this.classId)
                        .subscribe((response) => {
                          this.studentClassDetails = response.data.docs[0];
                          // console.log("enterd", this.studentClassDetails);
                          if (this.studentClassDetails.status == 'approved') {
                            this.router.navigate([
                              '/student/questions/',
                              classId,
                              studentId,
                              this.courseId,
                            ]);
                          } else {
                          }
                        });
                    } else {
                      let payload = {
                        status: 'notCompleted',
                        studentId: studentId,
                      };
                      this.classService
                        .saveApprovedClasses(classId, payload)
                        .subscribe((response) => {});
                    }
                  } else {
                  }
                });
            });
          }
        });
    });

    // this.destroyModal(event.target.currentTime);
  }
  onPlay() {
    this.isPlaying = true;
  }

  playVideos(video: {
    name: any;
    discription: string;
    id: any;
    playbackTime: any;
  }) {
    this.videoPlayer.nativeElement.currentTime = video?.playbackTime;
    this.commonService.setPlayBackTime(video?.playbackTime);

    this.courseService.getCoursekitVideoById(video.id).subscribe((data) => {
      let videoUrl = data?.data;
      this.videoPlayer.nativeElement.src = videoUrl?.video_url;
      // console.log("data:12 " , data.data)
    });
    this.sdiscrption = video.discription;
    this.header = video.name;
    this.commonService.setVideoDetails(video);
  }

  registerClass(classId: string) {
    let userdata = JSON.parse(localStorage.getItem('currentUser')!);
    let studentId = localStorage.getItem('id');

    let payload = {
      email: userdata.user.email,
      name: userdata.user.name,
      courseTitle: this.classDetails?.courseId?.title,
      courseFee: this.classDetails?.courseId?.fee,
      studentId: studentId,
      classId: this.classId,
      title: this.title,
      coursekit: this.courseKit,
    };
    this.courseService.saveRegisterClass(payload).subscribe((response) => {
      this.document.location.href = response.data.session.url;
      this.getClassDetails();
    });
  }
  getCourseKitDetails() {
    this.courseService.getCourseById(this.courseId).subscribe((response) => {
      this.courseKitDetails = response?.course_kit;
      // if (Array.isArray(this.courseKitDetails)) {

      this.courseKitDetails.map((item: any) => {
        this.url = item?.videoLink[0]?.video_url;
      });

      this.courseKit = this.courseKitDetails.map((kit: any) => ({
        shortDescription: kit.shortDescription,
        longDescription: kit.longDescription,
        documentLink: kit.documentLink,
        name: kit.name,
        filename: kit?.videoLink[0]?.doc_filename,
        videoId: kit?.videoLink[0]?.id,
        inputUrl: kit?.videoLink[0]?.video_url,
        url: kit?.videoLink[0]?.url,
        playbackTime: 0,
      }));

      this.documentLink = this.courseKitDetails[0].documentLink;
      const uploadedDocument = this.documentLink?.split('/');
      this.uploadedDoc = uploadedDocument?.pop();
      this.title = response?.title;
      this.assessmentInfo = response?.assessment;
      this.questionList =response?.assessment?.questions || [];
      const survey = response?.survey
      this.feedbackInfo = survey? {
        name: survey?.name,
        id: survey?.id,
        questions: survey?.questions?.map((question:any)=>({
          questionText: question?.questionText,
          type: question?.type,
          isMandatory: question?.isMandatory,
          maxRating: question?.maxRating,
          options: question?.options?.map((option:any)=>
            option.text
          )
        }))
      }: null
    });
  }



  getRegisteredClassDetails() {
    const studentId = localStorage.getItem('id');
    this.courseService
      .getStudentClass(studentId, this.classId)
      .subscribe((response) => {
        this.studentClassDetails = response?.data?.docs[0];
        this.coursekitDetails = response?.data?.docs[0]?.coursekit;
        this.longDescription = this?.coursekitDetails[0]?.longDescription;
        let totalPlaybackTime = 0;
        let documentCount = 0;
        this.coursekitDetails.forEach(
          (doc: { playbackTime: any }, index: number) => {
            const playbackTime = doc.playbackTime;
            totalPlaybackTime += playbackTime;
            documentCount++;
          }
        );
        const time = totalPlaybackTime / documentCount;
        this.playBackTime = time;
        this.commonService.setCompletedPercentage(this.playBackTime);
        if (this.studentClassDetails.status == 'registered') {
          this.isRegistered == true;
          this.isStatus = true;
        }
        if (this.studentClassDetails.status == 'approved') {
          this.isRegistered == true;
          this.isApproved = true;
        }
        if (
          !this.studentClassDetails.certifiacteUrl &&
          this.studentClassDetails.status == 'completed'
        ) {
          this.isRegistered == true;
          this.isCompleted = true;
        }
        if (
          this.studentClassDetails.certifiacteUrl &&
          this.studentClassDetails.status == 'completed'
        ) {
          this.isRegistered == true;
          this.isCompleted = true;
          this.certificateIssued = true;
        }
        if (this.studentClassDetails.status == 'cancel') {
          this.isRegistered == true;
          this.isCancelled = true;
        }
      });
  }

  // playVideo(video: { url: any, playbackProgress: number, id: any, playbackTime: any }): void {
  //   if (video?.url) {
  //     this.openVidePlayer(video);
  //     this.commonService.setPlayBackTime(video?.playbackTime)

  //   } else {
  //     console.error("Invalid video URL");
  //   }
  // }

  // openVidePlayer(videoLink: { url?: any; id?: any; playbackProgress?: number }): void {
  //   if (videoLink?.id) {
  //     const videoId = videoLink.id;
  //     this.courseService.getVideoById(videoId).subscribe((res) => {
  //       const videoURL = res.data.videoUrl;
  //       if (!videoURL) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Video Convert is Pending",
  //           text: "Please start convert this video",
  //         });
  //         return

  //       }
  //       const videoType = "application/x-mpegURL";
  //       if (videoURL) {
  //         const initialState: ModalOptions = {
  //           initialState: {
  //             videoURL,
  //             videoType,
  //             playbackProgress: videoLink.playbackProgress || 0,
  //            // Default to 0 if not provided

  //           },
  //           class: "videoPlayer-modal",
  //           backdrop: 'static', keyboard: false
  //         };
  //         this.commonService.setVideoDetails(videoLink)

  //         this.modalServices.show(StudentVideoPlayerComponent, initialState);
  //       }
  //     });
  //   }
  // }

  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  toggleVideoPlay() {
    const video = this.videoPlayer.nativeElement;
    if (this.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  }

  destroyModal(): void {
    const playBackTime = this.commonService.getProgressArray();
    const videoDetails = this.commonService.getVideoDetails();
    let lastButOneValue = playBackTime[playBackTime.length - 1];
    let classId = localStorage.getItem('classId');
    let studentId = localStorage.getItem('id');
    let payload = {
      studentId: studentId,
      classId: classId,
      playbackTime: lastButOneValue,
      videoId: videoDetails.id,
    };
    let time = this.commonService.getPlayBackTime();
    if (lastButOneValue < time) {
    } else {
      this.classService
        .saveApprovedClasses(classId, payload)
        .subscribe((response) => {
          this.courseService
            .getStudentClass(studentId, classId)
            .subscribe((response) => {
              this.studentClassDetails = response.data.docs[0];
              this.coursekitDetails = response.data.docs[0].coursekit;
              let totalPlaybackTime = 0;
              let documentCount = 0;
              this.coursekitDetails.forEach(
                (doc: { playbackTime: any }, index: number) => {
                  const playbackTime = doc.playbackTime;
                  totalPlaybackTime += playbackTime;
                  documentCount++;
                }
              );
              let time = totalPlaybackTime / documentCount;
              this.playBackTime = time;
              this.commonService.setCompletedPercentage(this.playBackTime);
              let percentage = this.commonService.getCompletedPercentage();
              let body = {
                studentId: studentId,
                playBackTime: percentage,
              };
              this.classService
                .saveApprovedClasses(classId, body)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe((response) => {
                  this.commonService.notifyVideoMethod();
                });
            });
        });
    }
  }
  // feedback(){
  //   let classId = localStorage.getItem('classId');
  //   let studentId = localStorage.getItem('id');
  //   this.router.navigate(['/student/feedback/courses', classId, studentId, this.courseId]);
  // }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submitAnswers(payload: any = []) {
    const studentId = localStorage.getItem('id');
    const assesmentId = this.assessmentInfo?.id;
    const requestBody = {
      studentId,
      assessmentId: assesmentId,
      answers: payload,
    };

    this.studentService.submitAssessment(requestBody).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'Submitted!',
          text: 'Your answers were submitted.',
          icon: 'success',
        });
        this.getAnswerById(response.response);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  getAnswerById(answerId: string) {
    this.studentService.getAnswerById(answerId).subscribe((res: any) => {
    this.isAnswersSubmitted = true;
      this.answersResult = res.assessmentAnswer
      const assessmentAnswer = res.assessmentAnswer;
      const assessmentId = assessmentAnswer.assessmentId;
      this.questionList = assessmentId.questions.map((question: any) => {
        const answer = assessmentAnswer.answers.find(
          (ans: any) => ans.questionText === question.questionText
        );
        const correctOption = question.options.find(
          (option: any) => option.correct
        );
        const selectedOption = answer ? answer.selectedOptionText : null;
        const status = selectedOption
          ? correctOption.text === selectedOption
          : false;
        return {
          _id: question._id,
          questionText: question.questionText,
          selectedOption: answer
            ? answer.selectedOptionText
            : 'No answer provided',
          status: status,
          options: question.options,
          score: assessmentAnswer.score,
        };
      });
      this.isAnswersSubmitted = true;
    });
  }
}
