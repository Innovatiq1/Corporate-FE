import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseKitModel, CoursePaginationModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-course-kit',
  templateUrl: './view-course-kit.component.html',
  styleUrls: ['./view-course-kit.component.scss']
})
export class ViewCourseKitComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Course Kit'],
      active: 'View CourseKit',
    },
  ];
  classDataById: any;
  courseKitData: any;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  courseId: any;
  response: any;
  currentDate: Date;
  courseKitModel!: Partial<CourseKitModel>;
  templates: any[] = [];
  course: any;


  constructor(
    private _router: Router,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private modalServices: BsModalService,
  ) {
    this.currentDate = new Date();
    this.courseKitModel = {};
    this.activatedRoute.params.subscribe((params: any) => {
      
      this.courseId = params.id;
      // if(this.courseId){
      //   this.getProgramByID(this.courseId);
      // }

    });
  }
  
  ngOnInit(){
    this.fetchCourseKits();
    this.getJobTemplates();
    if (this.courseId) {
      this.activatedRoute.params.subscribe((params: any) => {
        
        this.courseId = params.id;
        this.getCategoryByID(this.courseId);
      });
    }
  }

  fetchCourseKits() {
    this.courseService.getCourseKit({ ...this.courseKitModel })
      .subscribe(response => {
        console.log("===response==",response)

        this.courseKitData = response.docs;

        this.getJobTemplates();

      }, (error) => {

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

  getCategories(id: string): void {
    
    this.getCategoryByID(id);
  }
  getCategoryByID(id: string) {
   course: this.courseService.getCourseKitById(id).subscribe((response: any) => {
    // this.course = response.course;
      this.classDataById = response?._id;
      this.response = response;
      // this.subCategory = response.subCategories;
      // if (response && response.data && response.data._id) {
      //   this.classDataById = response?._id;
      //   this.response = response.data;
      // } else {
       
      // }
    });
  }
  playVideo(video: { video_url: any; }): void {
    console.log('Video',video)
    if (video?.video_url) {
      this.openVidePlayer(video);
    } else {
      console.error("Invalid video URL");
    }
  }
   openVidePlayer(videoLink: { video_url?: any; id?: any; }): void {
    // const { videoLink } = videoLink;
    if (videoLink?.id) {
      const videoURL = videoLink.video_url;
      // this.courseService.getVideoById(videoId).subscribe((res) => {
      //   const videoURL = res.data.videoUrl;
        if (!videoURL) {
          Swal.fire({
            icon: "error",
            title: "Video Convert is Pending",
            text: "Please start convert this video",
          });
          return

        }
        // const videoType = "application/x-mpegURL";
        if (videoURL) {
          const initialState: ModalOptions = {
            initialState: {
              videoURL,
              // videoType,
            },
            class: "videoPlayer-modal",
          };
          this.modalServices.show(VideoPlayerComponent, initialState);
        }
      // });
    }
  }
  
  deleteItem(item: any) {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this course kit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourseKit(item._id).subscribe(
          () => {
            Swal.fire({
              title: "Deleted",
              text: "Course Kit deleted successfully",
              icon: "success",
            });
            this.fetchCourseKits();
            this._router.navigateByUrl(`/admin/courses/course-kit`);
          },
          (error: { message: any; error: any; }) => {
            Swal.fire(
              "Failed to delete course kit",
              error.message || error.error,
              "error"
            );
          }
        );
      }
    });
  }
}
