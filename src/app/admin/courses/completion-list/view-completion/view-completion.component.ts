import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session, Student, StudentApproval, StudentPaginationModel } from '@core/models/class.model';
import { CourseService } from '@core/service/course.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

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
      active: 'View Completion List',
    },
  ];

  classDataById: any;
  completedData: any;
  studentPaginationModel: StudentPaginationModel;
  courseId: any;
  response: any;
  status:boolean = false;
  showTab:boolean = false;
  paramStatus: any;
  constructor(private classService: ClassService,private courseService: CourseService,private _router: Router, private activatedRoute: ActivatedRoute,public _classService: ClassService,) {

    this.studentPaginationModel = {} as StudentPaginationModel;
    this.activatedRoute.queryParams.subscribe((params: any) => {
      
      this.courseId = params['id'];
      this.getCategoryByID(this.courseId);
  if(params['status'] === 'pending') {
    this.status = true;
    this.showTab = false;
  } else if(params['status'] === 'approved') {
    this.status = false;
    this.showTab = false;
  }
  this.paramStatus =  params['status'];
      // if(this.courseId){
      //   this.getProgramByID(this.courseId);
      // }

    });
  }

    ngOnInit(): void {
      this.getCompletedClasses();
      // if (this.courseId) {
      //   this.activatedRoute.params.subscribe((params: any) => {
          
      //     this.courseId = params.id;
          
      //   });
      // }
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

  getCurrentUserId(): string {
    return JSON.parse(localStorage.getItem('user_data')!).user.id;
  }
  changeStatus(element: Student, status: string) {
    const item: StudentApproval = {
      approvedBy: this.getCurrentUserId(),
      approvedOn: moment().format('YYYY-MM-DD'),
      classId: element.classId._id,
      status,
      studentId: element.studentId.id,
      session: this.getSessions(element),
    };

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to approve this course!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        this._classService
        .saveApprovedClasses(element.id, item)
        .subscribe((_response: any) => {
          Swal.fire({
            title: 'Success',
            text: 'Course approved successfully.',
            icon: 'success',
            // confirmButtonColor: '#526D82',
          });
          window.history.back();
        }, (error) => {
              Swal.fire({
                title: 'Error',
                text: 'Failed to approve course. Please try again.',
                icon: 'error',
                // confirmButtonColor: '#526D82',
              });
            });
      }
    });
 
  }

  getSessions(element: { classId: { sessions: any[] } }) {
    const sessions = element.classId?.sessions?.map((_: any, index: number) => {
      const session: Session = {} as Session;
      session.sessionNumber = index + 1;
      return session;
    });
    return sessions;
  }
}
