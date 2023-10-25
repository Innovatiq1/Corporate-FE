import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { StaffService } from '../all-staff/staff.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent {
  staffForm: UntypedFormGroup;
  editData:any;
  breadscrums = [
    {
      title: 'Add Staff',
      items: ['Staff'],
      active: 'Add Staff',
    },
  ];
  constructor(private fb: UntypedFormBuilder, public staffService:StaffService,public active:ActivatedRoute,public router:Router) {

    this.staffForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last_name: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      designation: [''],
      joiningDate: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ['', [Validators.required]],
      education: [''],
    });


    this.active.queryParams.subscribe(param =>{

      this.editData = param;
      this.patchData(this.editData)
    console.log("pa",this.editData);
    })
  }

patchData(_data: any){
  this.staffForm.patchValue({
    name:_data.name,
    last_name:_data.last_name ,
    gender:_data.gender ,
    mobile: _data.mobile,
    password:_data.password,
    conformPassword:_data.conformPassword,
    designation:_data.designation ,
    joiningDate:_data.joiningDate,
    address:_data.address ,
    email:_data.email ,
    dob:_data.dob ,
    education: _data.education,
  })
}
  onSubmit() {
    console.log('Form Value', this.staffForm.value);
  this.staffService.saveStaff(this.staffForm.value).subscribe((response: any) => {
    console.log("res",response);
    Swal.fire({
      title: 'Successful',
      text: 'Staff created successfully',
      icon: 'success',
    });
    this.router.navigate(['/admin/staff/all-staff'])
  });


  }

  update(){
    this.staffService.updateStaff(this.editData.id,this.staffForm.value).subscribe((response: any) => {
      console.log("res",response);
      Swal.fire({
        title: 'Successful',
        text: 'Staff updated successfully',
        icon: 'success',
      });
      this.router.navigate(['/admin/staff/all-staff'])
    });
  }
}
