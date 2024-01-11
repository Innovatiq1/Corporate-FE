/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EtmsService } from '@core/service/etms.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  requestForm!: FormGroup
  dataSource:object | undefined
  breadscrums = [
    {
      title: 'Employee Request',
      active: 'Create Request',
    },
  ];
  employeeID!: string;
  roId!: any;
  trainingAdminId!: string;
  trainingAdminName!:string;
  employeeName!:string
  roName!:string;
  directorName!:string;
  directorId!: string;

  constructor(private etmsService:EtmsService,private fb: FormBuilder, private router:Router, public utils:UtilsService){

    // this.requestForm = this.fb.group({
     
    // });

    this.requestForm = this.fb.group({
      name: ['',[...this.utils.validators.ename, this.utils.noLeadingSpace]],
      employeeId: ['',[...this.utils.validators.ename, this.utils.noLeadingSpace]],
      designation: ['', [...this.utils.validators.designation, this.utils.noLeadingSpace]],
      department: ['', [...this.utils.validators.designation, this.utils.noLeadingSpace]],
      email: ['', [...this.utils.validators.email, this.utils.noLeadingSpace]],
      ro: ['', [...this.utils.validators.ename, this.utils.noLeadingSpace]],
      trainingAdmin: ['', [...this.utils.validators.ename, this.utils.noLeadingSpace]],
      directorName: ['',[...this.utils.validators.ename, this.utils.noLeadingSpace]],
      courseName: ['',[...this.utils.validators.dname, this.utils.noLeadingSpace]],
      vendorName: ['',[...this.utils.validators.dname, this.utils.noLeadingSpace]],
      courseCost: ['',[...this.utils.validators.value, this.utils.noLeadingSpace]],
      courseTimeline: ['',[...this.utils.validators.value, this.utils.noLeadingSpace]],
     
    });

  }

  ngOnInit() {
    //console.log("=====tttttttttttttttt======")
  this.getUserId()
    
  }
  getUserId() {
    //sconsole.log("======trrrr")
    let userId = localStorage.getItem('id')
    this.etmsService.getUserId(userId).subscribe((response:any) => {
      this.dataSource =response
      this.employeeID=response._id
      this.roId=response.ro
      this.trainingAdminId=response.trainingAdmin
      this.directorId=response.director,
      this.trainingAdminName=response?.trainingAdminName,
      this.directorName=response?.directorName,
      this.roName=response?.roName,
      this.employeeName=  response?.name + ' ' +(response.last_name
          ? response.last_name
          : ''),
      
      this.requestForm.patchValue({
        name: response?.name + ' ' +(response.last_name
          ? response.last_name
          : ''),
      
      employeeId: response?.employeeId,
      department:response?.department,
      designation:response?.designation,
      email: response?.email,
      ro:response?.roName,
      trainingAdmin: response?.trainingAdminName,
      directorName:response?.directorName,

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

    }, () => {
    });
  }
  

 onSubmit() {
  if (this.requestForm.valid) {
    const requestData = this.requestForm.value;
    let user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    const payload = {
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
      userName:user.user.name
    };

    
    this.etmsService.createRequest(payload).subscribe((response: any) => {
      Swal.fire({
        title: 'Successful',
        text: 'Request created successfully',
        icon: 'success',
      });
      this.router.navigate(['/admin/approval-work-flow/employee-status']);
    });
  } 
}

}
