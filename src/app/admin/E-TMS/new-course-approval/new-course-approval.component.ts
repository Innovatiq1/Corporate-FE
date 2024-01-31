import { Direction } from '@angular/cdk/bidi';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { EmpRequest } from '@core/models/emp-request.model';
import { EtmsService } from '@core/service/etms.service';
import { UtilsService } from '@core/service/utils.service';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import Swal from 'sweetalert2';
import { EditNewCourseComponent } from './edit-new-course/edit-new-course.component';

@Component({
  selector: 'app-new-course-approval',
  templateUrl: './new-course-approval.component.html',
  styleUrls: ['./new-course-approval.component.scss']
})
export class NewCourseApprovalComponent extends UnsubscribeOnDestroyAdapter
implements OnInit
{
breadscrums = [
  {
    title: 'ETMS',
    items: [''],
    active: 'New Course Approval',
  },
];
ro = false;
payload = {};
director = false;
trainingAdmin = false;
dataSource: any;
id?: number;
coursePaginationModel!: Partial<CoursePaginationModel>;
totalItems: any;
pageSizeArr = this.utils.pageSizeArr;
approvedCourses = false;
rejectedCourses = false;
pendingCourses = false;


approved = 0;
pending = 0;
rejected = 0;

classesList = [
  {
    name: 'Michael John',
    course: 'Marketing Strategy',
    payment: '120',
    level: 'Beginner',
    date: '27/11/2023',
  },
];

constructor(
  private etmsService: EtmsService,
  private router: Router,
  public dialog: MatDialog,
  private snackBar: MatSnackBar,
  public httpClient: HttpClient,
  public utils: UtilsService,
  public exampleDatabase: EtmsService
) {
  super();
  this.coursePaginationModel = {};
  let user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (user.user.type == 'RO') {
    this.ro = true;
  } else if (user.user.type == 'Director') {
    this.director = true;
  } else if (user.user.type == 'Training Administrator') {
    console.log('user',user.user.type);
    this.trainingAdmin = true;

    
  }
}

ngOnInit() {
  this.pendingCourses =true;
  if (this.trainingAdmin) {
    this.getAllRequestsByTrainingAdmin();
  }
 
  
}

// onPendingClick(){
//   this.pendingCourses = true;
//   this.approvedCourses = false;
//   this.rejectedCourses = false;
//   if (this.trainingAdmin) {
//     this.getAllRequestsByTrainingAdmin();
//   }
// }
// onApprovedClick(){
//   this.pendingCourses = false;
//   this.approvedCourses = true;
//   this.rejectedCourses = false;
//   if (this.trainingAdmin) {
//     this.getAllApprovedRequestsByTrainingAdmin();
//   }
// }
// onRejectedClick(){
//   this.pendingCourses = false;
//   this.approvedCourses = false;
//   this.rejectedCourses = true;
//   if (this.trainingAdmin) {
//     this.getAllRejectedRequestsByTrainingAdmin();
//   }

// }

pageSizeChange($event: any) {
  this.coursePaginationModel.page = $event?.pageIndex + 1;
  this.coursePaginationModel.limit = $event?.pageSize;
  if(this.trainingAdmin){
    if(this.pendingCourses){
      this.getAllRequestsByTrainingAdmin();
    } else if(this.approvedCourses){
      this.getAllApprovedRequestsByTrainingAdmin();
    } else if(this.rejectedCourses){
      this.getAllRejectedRequestsByTrainingAdmin()
    }
  }
  this.getAllRequestsByTrainingAdmin();
  console.log("pagination", this.coursePaginationModel.page)
}



getAllRequestsByTrainingAdmin() {
  let trainingAdminId = localStorage.getItem('id');
  let trainingAdminStatus = 'inactive';
  this.etmsService
    .getCourseRequestsByTrainingAdmin({...this.coursePaginationModel,trainingAdminId,trainingAdminStatus,trainingAdminApproval:"Pending"})
    .subscribe(
      (response) => {
        this.dataSource = response.data.docs;
        this.totalItems = response.data.totalDocs;
        this.coursePaginationModel.docs = response.docs;
        this.coursePaginationModel.page = response.page;
        this.coursePaginationModel.limit = response.limit;
        }, error => {
        });
}

getAllApprovedRequestsByTrainingAdmin() {
  let trainingAdminId = localStorage.getItem('id');
  let trainingAdminStatus = 'active';
  this.etmsService
    .getCourseRequestsByTrainingAdmin({...this.coursePaginationModel,trainingAdminId,trainingAdminStatus,trainingAdminApproval:"Approved"})
    .subscribe(
      (response) => {
        this.dataSource = response.data.docs;
        this.totalItems = response.data.totalDocs;
        this.coursePaginationModel.docs = response.docs;
        this.coursePaginationModel.page = response.page;
        this.coursePaginationModel.limit = response.limit;
        }, error => {
        });
}

getAllRejectedRequestsByTrainingAdmin() {
  let trainingAdminId = localStorage.getItem('id');
  let trainingAdminStatus = 'reject';
  this.etmsService
    .getCourseRequestsByTrainingAdmin({...this.coursePaginationModel,trainingAdminId,trainingAdminStatus,trainingAdminApproval:"Rejected"})
    .subscribe(
      (response) => {
        this.dataSource = response.data.docs;
        this.totalItems = response.data.totalDocs;
        this.coursePaginationModel.docs = response.docs;
        this.coursePaginationModel.page = response.page;
        this.coursePaginationModel.limit = response.limit;
        }, error => {
        });
}


approve(req: any) {
  console.log("id",req.trainingAdmin.id);
  this.id = req.trainingAdmin.id;
  let tempDirection: Direction;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogRef = this.dialog.open(EditNewCourseComponent, {
    data: {
      empRequest: req,
      action: 'approve',
    },
    direction: tempDirection,
  });
  
  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
        (x) => x.id === this.id
      );

      if (foundIndex != null && this.exampleDatabase) {
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.etmsService.getDialogData();
      }
     
        this.getAllRequestsByTrainingAdmin();
      
      
    }
  });


}


reject(row: any) {
  this.id = row.trainingAdmin.id;
  let tempDirection: Direction;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogRef = this.dialog.open(EditNewCourseComponent, {
    data: {
      empRequest: row,
      action: 'edit',
    },
    direction: tempDirection,
  });

  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
        (x) => x.id === this.id
      );

      if (foundIndex != null && this.exampleDatabase) {
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.etmsService.getDialogData();
      }
    
        this.getAllRequestsByTrainingAdmin();
      
      
     
    }
  });
}

// getCount(){
//   let userId = localStorage.getItem('id');
//   let userRole = localStorage.getItem('user_type');
// console.log("userId = " + userId);
// console.log("userRole = " + userRole);
// if(userRole == "Director"){
//   this.etmsService.getDeptBudgetRequestDirectorCount(userId).subscribe(res =>{
//     this.approved = res.data.docs.budgetRequestApproved;
//     this.rejected = res.data.docs.budgetRequestRejected;
//     this.pending = res.data.docs.budgetRequestPending;
  
//   })
//   }

 
// }
}
