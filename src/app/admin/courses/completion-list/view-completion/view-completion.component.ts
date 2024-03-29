import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentPaginationModel } from '@core/models/class.model';
import { CourseService } from '@core/service/course.service';
import { ClassService } from 'app/admin/schedule-class/class.service';

@Component({
  selector: 'app-view-completion',
  templateUrl: './view-completion.component.html',
  styleUrls: ['./view-completion.component.scss']
})
export class ViewCompletionComponent {
  breadscrums = [
    {
      title: 'Blank',
      items: ['Courses'],
      active: 'View Class',
    },
  ];

  classDataById: any;
  completedData: any;
  studentPaginationModel: StudentPaginationModel;
  courseId: any;
  response: any;
  constructor(private classService: ClassService,private courseService: CourseService,private _router: Router, private activatedRoute: ActivatedRoute,) {

    this.studentPaginationModel = {} as StudentPaginationModel;
    this.activatedRoute.params.subscribe((params: any) => {
      
      this.courseId = params.id;
      // if(this.courseId){
      //   this.getProgramByID(this.courseId);
      // }

    });
  }

    ngOnInit(): void {
      this.getCompletedClasses();
      if (this.courseId) {
        this.activatedRoute.params.subscribe((params: any) => {
          
          this.courseId = params.id;
          this.getCategoryByID(this.courseId);
        });
      }
    }

  getCompletedClasses() {
    this.classService
      .getSessionCompletedStudent(this.studentPaginationModel.page, this.studentPaginationModel.limit)
      .subscribe((response: { docs: any; page: any; limit: any; totalDocs: any; }) => {
        this.completedData = response.docs;
      })
  }
  getCategories(id: string): void {
    
    this.getCategoryByID(id);
  }
  getCategoryByID(id: string) {
     this.courseService.getStudentClassById(id).subscribe((response: any) => {
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
}
