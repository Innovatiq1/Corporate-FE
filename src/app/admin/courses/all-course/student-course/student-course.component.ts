import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.scss']
})
export class StudentCourseComponent {
  displayedColumns: string[] = [
    // 'select',
    'img',
    'User Type',
    'Name',
    // 'gender',
    // 'Qualification',
    // 'Mobile',
    // 'Email',
    // 'Status',
    // 'Actions'
  ];
  breadscrums = [
    {
      title: 'Users',
      items: ['Course'],
      active: 'Staff Details',
    },
  ];

  dataSource: any;
  isLoading = true;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  subscribeParams: any;
  courseId: any;
  title: any;

  constructor(private router: Router,
    public utils: UtilsService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,

  ) {

    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.courseId = params.id;
      this.title = params.coursename;
    
    
    });
    this.coursePaginationModel = {};
   
}


ngOnInit(): void {
  this.getStudentClassesList();
}

getStudentClassesList(filters?:any) {
  this.courseService.getStudentsByCourseId(this.courseId).subscribe((response: any) => {
    this.dataSource = response;
    this.isLoading = false;

  }, error => {
  });
}


}
