/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { EtmsService } from '@core/service/etms.service';
import { UtilsService } from '@core/service/utils.service';
import { Observable, map, startWith } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
})
export class CreateRequestComponent implements OnInit {
  requestForm!: FormGroup;
  dataSource: object | undefined;
  breadscrums = [
    {
      title: 'Employee Request',
      active: 'Create Request',
    },
  ];

  country = [{ name: 'United States' }, { name: 'United States1' }];
  employeeID!: string;
  roId!: any;
  trainingAdminId!: string;
  trainingAdminName!: string;
  employeeName!: string;
  roName!: string;
  directorName!: string;
  directorId!: string;
  sourceData: any;
  editUrl: any;

  _id: any;
  urlPath: any;
  searchTerm: string = '';

  constructor(
    private etmsService: EtmsService,
    private fb: FormBuilder,
    private _courseService: CourseService,
    private router: Router,
    public activeRoute: ActivatedRoute,
    public utils: UtilsService
  ) {
    this.activeRoute.queryParams.subscribe((params) => {
      this._id = params['id'];
      this.urlPath = params['action'];
    });

    if (this.urlPath === 'edit') {

      this.breadscrums = [
        {
          title: 'Edit Request',
          active: 'Edit Request',
        },
      ];
    }

    this.requestForm = this.fb.group({

      name: ['', [...this.utils.validators.ename, this.utils.noLeadingSpace]],
      employeeId: [
        '',
        [...this.utils.validators.ename, this.utils.noLeadingSpace],
      ],
      designation: [
        '',
        [...this.utils.validators.designation, this.utils.noLeadingSpace],
      ],
      department: [
        '',
        [...this.utils.validators.designation, this.utils.noLeadingSpace],
      ],
      email: ['', [...this.utils.validators.email, this.utils.noLeadingSpace]],
      ro: ['', [...this.utils.validators.ename, this.utils.noLeadingSpace]],
      trainingAdmin: [
        '',
        [...this.utils.validators.ename, this.utils.noLeadingSpace],
      ],
      directorName: [
        '',
        [...this.utils.validators.ename, this.utils.noLeadingSpace],
      ],
      courseName: [
        '',
        [...this.utils.validators.dname, this.utils.noLeadingSpace],
      ],
      vendorName: [
        '',
        [...this.utils.validators.dname, this.utils.noLeadingSpace],
      ],
      courseCost: [
        '',
        [...this.utils.validators.value, this.utils.noLeadingSpace],
      ],
      courseTimeline: [
        '',
        [...this.utils.validators.value, this.utils.noLeadingSpace],
      ],
    });
  }

  ngOnInit() {

    let payload ={
      generateId:"yes"
    }
    this.etmsService.createRequest(payload).subscribe((response: any) => {
      console.log('rees',response)
      this.requestId = response.data.employeeData.requestId
      console.log('idddddd',this.requestId)
      this.requestForm.patchValue({
        requestId:this.requestId
      })
    })
    
  this.getUserId();
  if (this.urlPath === "edit") {
    this.getData();
  }
  this.getCourseList();
  }
  getUserId() {
    //sconsole.log("======trrrr")
    let userId = localStorage.getItem('id');
    this.etmsService.getUserId(userId).subscribe(
      (response: any) => {
        this.dataSource = response;
        this.employeeID = response._id;
        this.roId = response.ro;
        this.trainingAdminId = response.trainingAdmin;
        (this.directorId = response.director),
          (this.trainingAdminName = response?.trainingAdminName),
          (this.directorName = response?.directorName),
          (this.roName = response?.roName),
          (this.employeeName =
            response?.name +
            ' ' +
            (response.last_name ? response.last_name : '')),
          this.requestForm.patchValue({
            name:
              response?.name +
              ' ' +
              (response.last_name ? response.last_name : ''),

            employeeId: response?.employeeId,
            department: response?.department,
            designation: response?.designation,
            email: response?.email,
            ro: response?.roName,
            trainingAdmin: response?.trainingAdminName,
            directorName: response?.directorName,

            // designation: ['', [...this.utils.validators.designation, this.utils.noLeadingSpace]],
            // department: ['', [...this.utils.validators.designation, this.utils.noLeadingSpace]],
            // email: ['', [...this.utils.validators.email, this.utils.noLeadingSpace]],
            // supervisor: ['', [...this.utils.validators.ename, this.utils.noLeadingSpace]],
            // learingAdmin: ['', [...this.utils.validators.ename, this.utils.noLeadingSpace]],
            // departmentHead: ['',[...this.utils.validators.ename, this.utils.noLeadingSpace]],
            // courseName: ['',[...this.utils.validators.dname, this.utils.noLeadingSpace]],
            // vendorName: ['',[...this.utils.validators.dname, this.utils.noLeadingSpace]],
            // courseCost: ['',[...this.utils.validators.value, this.utils.noLeadingSpace]],
            // courseTimeline: ['',[...this.utils.validators.value, this.utils.noLeadingSpace]],
          });
      },
      () => {}
    );
  }


  /** getting all course list */
  getCourseList() {
    this.etmsService.getAllCoursesTitle('active').subscribe((courses) => {
      this.sourceData = courses;
      console.log('courses', this.sourceData);
    });
  }

  /** Performing course search */

  performSearch() {
    if (this.requestForm.value.courseName) {
      this.sourceData = this.sourceData?.filter((item: any) => {
        const searchList = item.title.toLowerCase();
        return (
          searchList.indexOf(
            this.requestForm.value.courseName.toLowerCase()
          ) !== -1
        );
      });
    } else {
      this.getCourseList();
    }
  }

  // filteredCourse(title:any) {
  //   this.sourceData = this.sourceData.filter((course: { title: string; }) => {
  //     return course.title.toLowerCase().indexOf(title.toLowerCase()) > -1;
  //   });
  // }



 onSubmit() {
  if (this.requestForm.valid) {
    const requestData = this.requestForm.value;
    let user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    this.etmsService.getUserId(this.roId).subscribe((response:any) => {
      this.etmsService.getUserId(this.directorId).subscribe((res:any) => {
      this.etmsService.getUserId(this.trainingAdminId).subscribe((data:any) => {
      const payload = {
        requestId: this.requestId ,
        employeeId: this.employeeID ,
        designation: requestData.designation,
        department: requestData.department,
        email: requestData.email,
        ro: this.roId,
        trainingAdmin: this.trainingAdminId,
        trainingAdminName: this.trainingAdminName,
        directorName: this.directorName,
        roName:this.roName,
        employeeName:this.employeeName,
        director: this.directorId,
        courseName: requestData.courseName,
        vendorName: requestData.vendorName,
        courseCost: requestData.courseCost,
        courseTimeline: requestData.courseTimeline,
        roApproval:"Pending",
        directorApproval:"Pending",
        trainingAdminApproval:"Pending",
        userName:user.user.name,
        roEmail:response.email,
        directorEmail:res.email,
        trainingAdminEmail:data.email
      };
      this.etmsService.createRequest(payload).subscribe((response: any) => {
        Swal.fire({
          title: 'Successful',
          text: 'Request created successfully',
          icon: 'success',
        });
        this.router.navigate(['/admin/e-tms/employee-status']);
      });
    });
    })
  })

  } 
}


  getData() {
    let userId = localStorage.getItem('id');
    this.etmsService.getRequestById(this._id).subscribe((response: any) => {
      if (response) {
        this.dataSource = response;
        this.employeeID = response._id;
        this.roId = response.ro;
        this.trainingAdminId = response.trainingAdmin;
        this.directorId = response.director;
        this.trainingAdminName = response?.trainingAdminName;
        this.directorName = response?.directorName;
        this.roName = response?.roName;
        this.employeeName =
          response?.name + ' ' + (response.last_name ? response.last_name : '');

        this.requestForm.patchValue({

          name: response?.employeeName + ' ' + (response.last_name ? response.last_name : ''),
          requestId: response?.requestId,
          department: response?.department,
          designation: response?.designation,
          email: response?.email,
          ro: response?.roName,
          trainingAdmin: response?.trainingAdminName,
          directorName: response?.directorName,
          courseName: response?.courseName,
          vendorName: response?.vendorName,
          courseCost: response?.courseCost,
          courseTimeline: response?.courseTimeline,
        });
      }
    });
  }
}
