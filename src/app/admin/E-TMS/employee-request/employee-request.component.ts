/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { EditRequestComponent } from './edit-request/edit-request.component';

@Component({
  selector: 'app-employee-request',
  templateUrl: './employee-request.component.html',
  styleUrls: ['./employee-request.component.scss'],
})
export class EmployeeRequestComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  breadscrums = [
    {
      title: 'ETMS',
      items: [''],
      active: 'Course Request ',
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
    if (this.ro) {
      this.getAllRequestsByRo();
    } else if (this.director) {
      this.getAllRequestsByDirector();
    } else if (this.trainingAdmin) {
      this.getAllRequestsByTrainingAdmin();
    }
    this.getCount();
  }
  getAllRequestsByRo() {
    let roId = localStorage.getItem('id');
    this.etmsService.getAllRequestsByRo({...this.coursePaginationModel,roId,roApproval:"Pending"}).subscribe(
      (response) => {
        this.dataSource = response.data.docs;
        this.totalItems = response.data.totalDocs;
        this.coursePaginationModel.docs = response.docs;
        this.coursePaginationModel.page = response.page;
        this.coursePaginationModel.limit = response.limit;
      },
      (error) => {}
    );
  }

  getAllApprovedRequestsByRo() {
    let roId = localStorage.getItem('id');
    this.etmsService.getAllRequestsByRo({...this.coursePaginationModel,roId,roApproval:"Approved"}).subscribe(
      (response) => {
        this.dataSource = response.data.docs;
        this.totalItems = response.data.totalDocs;
        this.coursePaginationModel.docs = response.docs;
        this.coursePaginationModel.page = response.page;
        this.coursePaginationModel.limit = response.limit;
      },
      (error) => {}
    );
  }
  getAllRejectedRequestsByRo() {
    let roId = localStorage.getItem('id');
    this.etmsService.getAllRequestsByRo({...this.coursePaginationModel,roId,roApproval:"Rejected"}).subscribe(
      (response) => {
        this.dataSource = response.data.docs;
        this.totalItems = response.data.totalDocs;
        this.coursePaginationModel.docs = response.docs;
        this.coursePaginationModel.page = response.page;
        this.coursePaginationModel.limit = response.limit;
      },
      (error) => {}
    );
  }
  onPendingClick(){
    this.pendingCourses = true;
    this.approvedCourses = false;
    this.rejectedCourses = false;
    if (this.ro) {
      this.getAllRequestsByRo();
    } else if (this.director) {
      this.getAllRequestsByDirector();
    } else if (this.trainingAdmin) {
      this.getAllRequestsByTrainingAdmin();
    }
  }
  onApprovedClick(){
    this.pendingCourses = false;
    this.approvedCourses = true;
    this.rejectedCourses = false;
    if (this.ro) {
      this.getAllApprovedRequestsByRo();
    } else if (this.director) {
      this.getAllApprovedRequestsByDirector();
    } else if (this.trainingAdmin) {
      this.getAllApprovedRequestsByTrainingAdmin();
    }

  }

  onRejectedClick(){
    this.pendingCourses = false;
    this.approvedCourses = false;
    this.rejectedCourses = true;
    if (this.ro) {
      this.getAllRejectedRequestsByRo();
    } else if (this.director) {
      this.getAllRejectedRequestsByDirector();
    } else if (this.trainingAdmin) {
      this.getAllRejectedRequestsByTrainingAdmin();
    }

  }


  getAllRequestsByDirector() {
    let directorId = localStorage.getItem('id');
    this.etmsService.getAllRequestsByDirector({...this.coursePaginationModel,directorId,directorApproval:"Pending"}).subscribe(
      (response) => {
        this.dataSource = response.data.docs;
        this.totalItems = response.data.totalDocs;
        this.coursePaginationModel.docs = response.docs;
        this.coursePaginationModel.page = response.page;
        this.coursePaginationModel.limit = response.limit;
      },
      (error) => {}
    );
  }

  getAllApprovedRequestsByDirector() {
    let directorId = localStorage.getItem('id');
    this.etmsService.getAllRequestsByDirector({...this.coursePaginationModel,directorId,directorApproval:"Approved"}).subscribe(
      (response) => {
        this.dataSource = response.data.docs;
        this.totalItems = response.data.totalDocs;
        this.coursePaginationModel.docs = response.docs;
        this.coursePaginationModel.page = response.page;
        this.coursePaginationModel.limit = response.limit;
      },
      (error) => {}
    );
  }

  getAllRejectedRequestsByDirector() {
    let directorId = localStorage.getItem('id');
    this.etmsService.getAllRequestsByDirector({...this.coursePaginationModel,directorId,directorApproval:"Rejected"}).subscribe(
      (response) => {
        this.dataSource = response.data.docs;
        this.totalItems = response.data.totalDocs;
        this.coursePaginationModel.docs = response.docs;
        this.coursePaginationModel.page = response.page;
        this.coursePaginationModel.limit = response.limit;
      },
      (error) => {}
    );
  }


  getAllRequestsByTrainingAdmin() {
    let trainingAdminId = localStorage.getItem('id');
    this.etmsService
      .getAllRequestsByTrainingAdmin({...this.coursePaginationModel,trainingAdminId,trainingAdminApproval:"Pending"})
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
    this.etmsService
      .getAllRequestsByTrainingAdmin({...this.coursePaginationModel,trainingAdminId,trainingAdminApproval:"Approved"})
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
    this.etmsService
      .getAllRequestsByTrainingAdmin({...this.coursePaginationModel,trainingAdminId,trainingAdminApproval:"Rejected"})
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
    console.log(req._id);
    this.id = req._id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(EditRequestComponent, {
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
        if (this.ro) {
          this.getAllRequestsByRo();
        } else if (this.director) {
          this.getAllRequestsByDirector();
        } else if (this.trainingAdmin) {
          this.getAllRequestsByTrainingAdmin();
        }
      }
    });

    // if (this.ro) {
    //   this.payload = {
    //     roApproval: 'Approved',
    //   };
    // } else if (this.director) {
    //   this.payload = {
    //     directorApproval: 'Approved',
    //   };
    // } else if (this.trainingAdmin) {
    //   this.payload = {
    //     trainingAdminApproval: 'Approved',
    //   };
    // }
    // this.etmsService
    //   .updateStatus(this.payload, id)
    //   .subscribe((response: any) => {
    //     if (this.ro) {
    //       Swal.fire({
    //         title: 'Approved Sucessfully',
    //         text: 'Sent Course Approval Request to Director',
    //         icon: 'success',
    //       });
    //       this.getAllRequestsByRo();
    //     } else if (this.director) {
    //       Swal.fire({
    //         title: 'Approved Sucessfully',
    //         text: 'Sent Course Approval Request to Training Admin',
    //         icon: 'success',
    //       });
    //       this.getAllRequestsByDirector();
    //     } else if (this.trainingAdmin) {
    //       Swal.fire({
    //         title: 'Successful',
    //         text: 'Approved Sucessfully',
    //         icon: 'success',
    //       });
    //       this.getAllRequestsByTrainingAdmin();
    //     }
    //   });
  }

  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.getAllRequestsByRo();
    this.getAllRequestsByDirector();
    this.getAllRequestsByTrainingAdmin();
    console.log("pagination", this.coursePaginationModel.page)
  }

  reject(row: EmpRequest) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(EditRequestComponent, {
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
        if (this.ro) {
          this.getAllRequestsByRo();
        } else if (this.director) {
          this.getAllRequestsByDirector();
        } else if (this.trainingAdmin) {
          this.getAllRequestsByTrainingAdmin();
        }
      }
    });
  }

  getCount(){
    let userId = localStorage.getItem('id');
    let userRole = localStorage.getItem('user_type');
console.log("userId = " + userId);
console.log("userRole = " + userRole);
if(userRole === "RO"){
  this.etmsService.getRequestRoCount(userId).subscribe(res =>{
    this.approved = res.data.docs.courseRequestApproved;
    this.rejected = res.data.docs.courseRequestRejected;
    this.pending = res.data.docs.courseRequestPending;

console.log(res);
  })
}else if(userRole == "Director"){
  this.etmsService.getRequestDirectorCount(userId).subscribe(res =>{
    this.approved = res.data.docs.courseRequestApproved;
    this.rejected = res.data.docs.courseRequestRejected;
    this.pending = res.data.docs.courseRequestPending;

console.log(res);
  })
}else if(userRole === "Training Administrator"){
  this.etmsService.getRequestTrainingAdminCount(userId).subscribe(res =>{
    this.approved = res.data.docs.courseRequestApproved;
    this.rejected = res.data.docs.courseRequestRejected;
    this.pending = res.data.docs.courseRequestPending;

console.log(res);
  })
}
   
  }
}
