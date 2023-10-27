import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { StaffService } from '../all-staff/staff.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StudentService } from '@core/service/student.service';
import { Users } from '@core/models/user.model';
import { UserService } from '@core/service/user.service';
import { AdminService } from '@core/service/admin.service';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent {
  staffForm: UntypedFormGroup;
  editData:any;
  isLoading = false;
  files: any;
  fileName: any;
  status = true;
  updateBtn:boolean = false;
  breadscrums = [
    {
      title: 'Add Staff',
      items: ['Staff'],
      active: 'Add Staff',
    },
  ];
  userTypes: any;
  paramId:any;
  constructor(private fb: UntypedFormBuilder, public staffService:StaffService,private adminService: AdminService, private userService: UserService,public active:ActivatedRoute,public router:Router, private studentService: StudentService) {

    this.staffForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last_name: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      type: [''],
      joiningDate: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ['', [Validators.required]],
      qualification: [''],
      avatar:[''],
      salary:['']
    });


    this.active.queryParams.subscribe(param =>{
      console.log("param",param['id'])
      this.paramId = param['id'];
      if(this.paramId != undefined){
        this.updateBtn = true;
        this.editData = param;
        this.patchData(this.editData)
      }
    })

    this.getUserTypeList();
  }

patchData(_data: any){
  this.staffForm.patchValue({
    name:_data.name,
    last_name:_data.last_name ,
    gender:_data.gender ,
    mobile: _data.mobile,
    password:_data.password,
    conformPassword:_data.conformPassword,
    type:_data.type ,
    joiningDate:_data.joiningDate,
    address:_data.address ,
    email:_data.email ,
    dob:_data.dob ,
    qualification: _data.qualification,
    avatar:_data.avatar,
      salary:_data.salary
  })
}

addBlog(formObj:any) {
  console.log('Form Value', formObj.value);
   if (!formObj.invalid) {
     this.studentService.uploadVideo(this.files).subscribe(
       (response: any) => {
         console.log("======",formObj.type)
         const inputUrl = response.inputUrl;

         formObj['Active']= this.status
         formObj['role']=formObj.type
         formObj['isLogin']=true

         const userData: Users = formObj;
         //this.commonService.setVideoId(videoId)

         userData.avatar = inputUrl;
         userData.filename = response.filename;

         //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
         // this.currentVideoIds.push(videoId);
         this.createUser(userData);

         Swal.close();
       },
       (error) => {
         Swal.fire({
           icon: 'error',
           title: 'Upload Failed',
           text: 'An error occurred while uploading the video',
         });
         Swal.close();
       }
     );
   }
  }

  createUser(userData:Users){
    this.userService.saveUsers(userData).subscribe(
      (response:any) => {
        this.isLoading = false;
        Swal.fire({
          title: 'Successful',
          text: 'User created succesfully',
          icon: 'success',
        });
        this.router.navigate(['/admin/staff/all-staff'])

      },
      (error:any) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to create user',
          error.message || error.error,
          'error'
        );
      }
    );


  }
  getUserTypeList(filters?:any) {
    this.adminService.getUserTypeList({ allRows: true }).subscribe(
      (response: any) => {
        this.userTypes = response;
        console.log("userT",this.userTypes);
      },
      (error) => {
      }
    );
  }

  onFileUpload(event:any) {
    this.fileName = event.target.files[0].name;
    this.files=event.target.files[0];
  }

  updateBlog(obj:any): any {
    return new Promise((resolve, reject) => {
      obj['Active']= this.status
      this.userService.updateUsers(obj, this.paramId).subscribe(
        (response) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Successful',
            text: 'User updated succesfully',
            icon: 'success',
          }).then(() => {
            resolve(response);
          });
          this.router.navigate(['/admin/staff/all-staff'])

        },
        (error) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update user',
            error.message || error.error,
            'error'
          );
          reject(error)
        }
      );
    })

  }
  submit() {
    this.addBlog(this.staffForm.value);
  }
  update() {
    this.updateBlog(this.staffForm.value);
  }

}
