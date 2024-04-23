import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '@core/service/admin.service';
import { CertificateService } from '@core/service/certificate.service';
import { CourseService } from '@core/service/course.service';
import { StudentService } from '@core/service/student.service';
import { UserService } from '@core/service/user.service';
import { ConfirmedValidator } from '@shared/password.validator';
import { StaffService } from 'app/admin/staff/staff.service';
import Swal from 'sweetalert2';

import { Users } from '@core/models/user.model';
@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent {
  breadscrums = [
    {
      title: 'Add Staff',
      items: ['Users'],
      active: 'Edit Staff',
    },
  ];
  staffForm: FormGroup;
  editData: any;
  isLoading = false;
  files: any;
  fileName: any;
  status = true;
  updateBtn: boolean = false;
  thumbnail: any; 
  userTypes: any;
  paramId: any;
  uploadedImage: any;
  uploaded: any;
  avatar: any;
  aboutDataId: any;
  aboutData: any;
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    public staffService: StaffService,
    private adminService: AdminService,
    private userService: UserService,
    public active: ActivatedRoute,
    public router: Router,
    private studentService: StudentService,
    private certificateService: CertificateService
  ) {
    this.staffForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
        last_name: [''],
        gender: ['', [Validators.required]],
        mobile: ['', [Validators.required]],
        type: [''],
        joiningDate: [''],
        address: [''],
        email: [
          '',
          [Validators.required, Validators.email, Validators.minLength(5)],
        ],
        dob: ['', [Validators.required]],
        qualification: [''],
        avatar: [''],
        salary: [''],
        password: ['', [Validators.required]],
        conformPassword: ['', [Validators.required]],
      },
      {
        validator: ConfirmedValidator('password', 'conformPassword'),
      }
    );

    this.active.queryParams.subscribe(params => {
      console.log(params['id']);
      this.aboutDataId = params['id'];
      this.loadData(this.aboutDataId);
    })
  }
  loadData(id:string) {
    this.courseService.getUserById(id).subscribe(res => {
      this.aboutData = res;
      console.log("edit",this.aboutData)
      this.staffForm.patchValue({
        name: this.aboutData?.name,
        last_name: this.aboutData?.last_name,
        gender: this.aboutData?.gender,
        mobile: this.aboutData?.mobile,
        type: this.aboutData?.type,
        joiningDate: this.aboutData?.joiningDate,
        address: this.aboutData?.address,
        email: this.aboutData?.email,
        dob: this.aboutData?.dob,
        qualification: this.aboutData?.qualification,
        avatar: this.aboutData?.avatar,
        salary: this.aboutData?.salary,
        password: this.aboutData?.password,
        confirmPassword: this.aboutData?.confirmPassword
  
    })

    });
  }
  updateBlog(formObj: any) {
    console.log('Form Value', formObj.value);
    if (!formObj.invalid) {
      // Prepare user data for update
      formObj['Active'] = this.status;
      formObj['role'] = formObj.type;
      formObj['isLogin'] = true;

      const userData: Users = formObj;

      // Ensure that the avatar property contains the correct URL
      userData.avatar = this.avatar; // Replace 'your_existing_avatar_url' with the actual avatar URL
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do You want to update this staff profile!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateUser(userData);
          Swal.close();
        }
      });
    }
  }
ngOnInit(){
  this.getUserTypeList();
}
  updateUser(obj: any): any {
    return new Promise((resolve, reject) => {
      obj['Active'] = this.status;
      this.userService.updateUsers(obj, this.aboutDataId).subscribe(
        (response) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Successful',
            text: 'User updated succesfully',
            icon: 'success',
          }).then(() => {
            resolve(response);
          });
          this.router.navigate(['student/settings/all-staff']);
          // this.router.navigate(['/admin/users/all-staff']);
        },
        (error) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update user',
            error.message || error.error,
            'error'
          );
          reject(error);
        }
      );
    });
  }
  update(){
    this.updateBlog(this.staffForm.value);
  }
  cancel(){
    this.router.navigate(['student/settings/all-staff']);
  }
  getUserTypeList(filters?: any) {
    this.adminService.getUserTypeList({ allRows: true }).subscribe(
      (response: any) => {
        this.userTypes = response;
        console.log('userT', this.userTypes);
      },
      (error) => {}
    );
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];

    this.thumbnail = file;
    const formData = new FormData();
    formData.append('files', this.thumbnail);
    this.courseService
      .uploadCourseThumbnail(formData)
      .subscribe((data: any) => {
        this.avatar = data.data.thumbnail;
        this.uploaded = this.avatar?.split('/');
        let image = this.uploaded?.pop();
        this.uploaded = image?.split('\\');
        this.fileName = this.uploaded?.pop();
      });
    // this.fileName = event.target.files[0].name;
    // this.files=event.target.files[0];
    // this.uploadedImage =event.target.files[0].name;

    // // const file = event.target.files[0];
    // const formData = new FormData();
    // // formData.append('files', file);
    // this.certificateService.uploadCourseThumbnail(formData).subscribe((response:any) => {
    // this.avatar = response.fileName;
    //   this.uploaded=this.avatar.split('/')
    //   this.uploadedImage = this.uploaded.pop();
    // });
  }
}
