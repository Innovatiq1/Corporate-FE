import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@core/service/course.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import Swal from 'sweetalert2';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { VideoPlayerComponent } from '../../../admin/courses/course-kit/video-player/video-player.component';


@Component({
  selector: 'app-view-program',
  templateUrl: './view-program.component.html',
  styleUrls: ['./view-program.component.scss'],
})
export class ViewProgramComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Program'],
      active: 'View Program',
    },
  ];
  programData: any;
  courseId: any;
  programDataById: any;
  background: boolean = false;
  response: any;
  image: any;
  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute,
    private router: Router, private classService: ClassService, 
    private modalServices: BsModalService,
  ) {
    // constructor

    this.activatedRoute.params.subscribe((params: any) => {
      console.log("params.id", params.id)
      this.courseId = params.id;
      // if(this.courseId){
      //   this.getProgramByID(this.courseId);
      // }

    });
  }

  getProgramLists() {
    this.courseService
      .getCourseProgram({ status: 'active' })
      .subscribe((response: any) => {
        this.programData = response.docs;

      });
  }

  ngOnInit() {
    this.getProgramLists();
    if (this.courseId) {
      this.activatedRoute.params.subscribe((params: any) => {
        
        this.courseId = params.id;
        this.getProgramByID(this.courseId);
      });
    }
  }
  getProgramByID(id: string) {
    this.courseService.getProgramById(id).subscribe((response: any) => {
     
      if (response && response.data && response.data.id) {
        this.response = response.data;
        this.programDataById = this.response.id;
      } else {
      }
    });
  }

  
  getProgramKits(id: string): void { 
    this.getProgramByID(id);
  }

  delete(id: string) {
    this.classService.getProgramClassList({ courseId: id }).subscribe((classList: any) => {
      const matchingClasses = classList.docs.filter((classItem: any) => {
        return classItem.courseId && classItem.courseId.id === id;
      });
      if (matchingClasses.length > 0) {
        Swal.fire({
          title: 'Error',
          text: 'Classes have been registered with this program. Cannot delete.',
          icon: 'error',
        });
        return;
      }
      this.courseService.deleteProgram(id).subscribe(() => {
        this.getProgramLists();
        Swal.fire({
          title: 'Success',
          text: 'Program deleted successfully.',
          icon: 'success',
        }).then(() => {
          window.location.reload();
        });
      });
    });
  }
  
  getCourseKits() {
    const rows = [];
    for (const course of this.response?.coreprogramCourse) {
      for (const kit of course.coreProgramName.course_kit) {
        rows.push(kit);
      }
    }
    return rows;
  }
  getElectiveCourseKits() {
    const rows = [];
    for (const course of this.response?.electiveprogramCourse) {
      for (const kit of course.electiveProgramName.course_kit) {
        rows.push(kit);
      }
    }
    return rows;
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
}
