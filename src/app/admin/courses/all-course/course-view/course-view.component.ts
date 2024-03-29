import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss'],
})
export class CourseViewComponent {
  displayedColumns1: string[] = ['video'];
  coursePaginationModel: Partial<CoursePaginationModel>;
  courseData: any;
  totalItems: any;
  courseId: any;
  sourceData: any;
  checkId = '';
  status: any;
  button: boolean = false;

  constructor(
    public _courseService: CourseService,
    private classService: ClassService,
    private activatedRoute: ActivatedRoute
  ) {
    // constructor
    this.coursePaginationModel = {};
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.courseId = params.id;
      this.status = params.status;
        this.getCourseByCourseId(this.courseId);
    });
    if(this.status === 'in-active'){
      this.button = true;
    }
  }

  ngOnInit() {
    if (this.courseId &&  this.status === 'active') {
      this.getAllCourse();
    }
    else if (this.courseId &&  this.status === 'in-active') {
      this.getAllInActiveCourse();
    }

  }
/*Get active courses */
  getAllCourse() {
    this._courseService
      .getAllCourses({ ...this.coursePaginationModel, status: 'active' })
      .subscribe((response) => {
        if (response) {
          this.courseData = response.data.docs;
        }
      });
  }
/*Get in-active courses */
getAllInActiveCourse() {
  this._courseService
    .getAllCourses({ ...this.coursePaginationModel, status: 'inactive' })
    .subscribe((response) => {
      if (response) {
        this.courseData = response.data.docs;
      }
    });
}

  getDataByClick(row_id: string) {
    this.getCourseByCourseId(row_id);
  }

  getCourseByCourseId(id: string) {
    this._courseService.getCourseById(id).subscribe((data) => {
      if (data) {
        this.sourceData = data;
        this.checkId = this.sourceData.id;
      }
    });
  }

  delete(id: string) {
    this.classService
      .getClassList({ courseId: id })
      .subscribe((classList: any) => {
        const matchingClasses = classList.docs.filter((classItem: any) => {
          return classItem.courseId && classItem.courseId.id === id;
        });
        if (matchingClasses.length > 0) {
          Swal.fire({
            title: 'Error',
            text: 'Classes have been registered with this course. Cannot delete.',
            icon: 'error',
          });
          return;
        }
        Swal.fire({
          title: 'Confirm Deletion',
          text: 'Are you sure you want to delete this  Course?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            this._courseService.deleteCourse(id).subscribe(() => {
              this.getAllCourse();
              Swal.fire({
                title: 'Success',
                text: 'Course deleted successfully.',
                icon: 'success',
              });
            });
          }
        });
      });
  }
}
