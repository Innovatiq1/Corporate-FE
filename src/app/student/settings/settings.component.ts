import { Component } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '@core/models/user.model';
import { AuthenService } from '@core/service/authen.service';
import { CertificateService } from '@core/service/certificate.service';
import { CourseService } from '@core/service/course.service';
import { EtmsService } from '@core/service/etms.service';

import { StudentsService } from 'app/admin/students/all-students/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  stdForm: UntypedFormGroup;
  stdForm1: UntypedFormGroup;
  profileForm: FormGroup;
  breadscrums = [
    {
      title: 'Settings',
      items: ['Student'],
      active: 'Settings',
    },
  ];
  editData: any;
  studentId: any;
  hide = true;
  isEmailFieldDisabled = true;
  files: any;
  fileName: any;
  avatar: any;
  uploadedImage: any;
  uploaded: any;
  cmUrl: any;
  pmUrl: any;
  hodUrl: any;
  superUrl: any;
  tcUrl: any;
  taUrl: any;
  adminUrl: any;
  roname: any;
  thumbnail: any;

  constructor(
    private studentService: StudentsService,
    private etmsService: EtmsService,
    private fb: UntypedFormBuilder,
    private certificateService: CertificateService,
    private router: Router,
    private authenservice: AuthenService,
    private courseService: CourseService,
  ) {
    let urlPath = this.router.url.split('/');
    this.cmUrl = urlPath.includes('coursemanager-settings');
    this.pmUrl = urlPath.includes('programmanager-settings');
    this.hodUrl = urlPath.includes('headofdepartment-settings');
    this.superUrl = urlPath.includes('supervisor-settings');
    this.tcUrl = urlPath.includes('trainingcoordinator-settings');
    this.taUrl = urlPath.includes('trainingadministrator-settings');
    this.adminUrl = urlPath.includes('admin-settings');

    if (this.cmUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Course Manager'],
          active: 'Settings',
        },
      ];
    }
    if (this.pmUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Program Manager'],
          active: 'Settings',
        },
      ];
    }
    if (this.hodUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Head Of Department'],
          active: 'Settings',
        },
      ];
    }
    if (this.superUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Supervisor'],
          active: 'Settings',
        },
      ];
    }
    if (this.tcUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Training Coordinator'],
          active: 'Settings',
        },
      ];
    }
    if (this.taUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Training Administrator'],
          active: 'Settings',
        },
      ];
    }
    if (this.adminUrl === true) {
      this.breadscrums = [
        {
          title: 'Settings',
          items: ['Admin'],
          active: 'Settings',
        },
      ];
    }
    this.patchValues(),
      //this.patchValues1()
      (this.stdForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
        password: [''],
        currentpassword: [''],
      }));
    this.stdForm1 = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],

      last_name: [''],

      mobile: [''],
      city_name: ['', [Validators.required]],
      country_name: ['', [Validators.required]],

      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],

      address: [''],
      avatar: [''],
    });

    this.profileForm = this.fb.group({
      empName: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      roName: ['', Validators.required],
      director: ['', Validators.required],
      TA: ['', Validators.required],
    });

    //constructor
  }

  ngOnInit() {
    this.getUserProfile();
  }
  patchValues() {
    this.studentId = localStorage.getItem('id');
    // let studentId = localStorage.getItem('id')?localStorage.getItem('id'):null
    this.studentService.getStudentById(this.studentId).subscribe((res: any) => {
      this.editData = res;
      this.avatar = this.editData.avatar;
      this.uploaded = this.avatar?.split('/');
      let image  = this.uploaded.pop();
      this.uploaded= image.split('\\');
      this.uploadedImage = this.uploaded.pop();

      this.stdForm.patchValue({
        name: this.editData.name,
        last_name: this.editData.last_name,
        currentpassword: this.editData.password,
      });
      this.stdForm1.patchValue({
        name: this.editData.name,
        last: this.editData.last_name,
        rollNo: this.editData.rollNo,
        gender: this.editData.gender,
        mobile: this.editData.mobile,

        email: this.editData.email,
        country_name: this.editData.country_name,
        city_name: this.editData.city_name,

        address: this.editData.address,
        uploadedImage: this.editData.avatar,
      });
    });
  }
  onFileUpload(event: any) {
    // this.fileName = event.target.files[0].name;
    // this.files = event.target.files[0];
    const file = event.target.files[0];
  
    this.thumbnail = file
    const formData = new FormData();
    formData.append('files', this.thumbnail);
   this.courseService.uploadCourseThumbnail(formData).subscribe((data: any) =>{
    this.avatar = data.data.thumbnail;
    this.uploaded=this.avatar.split('/')
    let image  = this.uploaded.pop();
    this.uploaded= image.split('\\');
    this.uploadedImage = this.uploaded.pop();
   
      // this.onSubmit1();
 
  });
    // this.uploadedImage = event.target.files[0].name;

    // // const file = event.target.files[0];
    // const formData = new FormData();
    // // formData.append('files', file);
    // this.certificateService
    //   .uploadCourseThumbnail(formData)
    //   .subscribe((response: any) => {
    //     this.avatar = response.avatar;
    //     this.uploaded = this.avatar.split('/');
    //     this.uploadedImage = this.uploaded.pop();
    //   });
  }


  onSubmit() {
    console.log('Form Value', this.stdForm.value);
    if (this.stdForm.valid) {
      // this.instructor.uploadVideo(this.files).subscribe(
      //   (response: any) => {
      //     const inputUrl = response.inputUrl;

      const userData: Student = this.stdForm.value;
      //this.commonService.setVideoId(videoId)

      //userData.avatar = inputUrl;
      //userData.filename= this.fileName
      userData.type = 'Student';
      userData.role = 'Student';

      //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
      // this.currentVideoIds.push(videoId);
      this.updateInstructor(userData);

      Swal.close();
      // },
    }
  }
  // onSubmit1() {
  //   console.log('========', this.stdForm1);
  //   if (!this.stdForm1.invalid) {
  //     this.studentService.uploadVideo(this.files).subscribe(
  //       (response: any) => {
  //         const inputUrl = response.inputUrl;
  //         this.authenservice.updateUserProfile(response.inputUrl);

  //         const userData: Student = this.stdForm1.value;
  //         //this.commonService.setVideoId(videoId)

  //         userData.avatar = inputUrl;
  //         userData.filename = response.filename;
  //         userData.type = 'Student';
  //         userData.role = 'Student';

  //         //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
  //         // this.currentVideoIds.push(videoId);
  //         this.updateInstructor(userData);

  //         Swal.close();
  //       },
  //       (error: any) => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Upload Failed',
  //           text: 'An error occurred while uploading the video',
  //         });
  //         Swal.close();
  //       }
  //     );
  //   }
  // }
  onSubmit1() {
    console.log('========', this.stdForm1);
    if (!this.stdForm1.invalid) {
      // No need to call uploadVideo() here since it's not needed
        const userData: Student = this.stdForm1.value;
        userData.avatar = this.avatar; // Assuming this.avatar contains the URL of the uploaded thumbnail
        userData.type = 'Student';
        userData.role = 'Student';

        this.updateInstructor(userData);

        Swal.close();
    }
   
}

  private updateInstructor(userData: Student): void {
    this.studentService.updateStudent(this.studentId, userData).subscribe(
      () => {
        Swal.fire({
          title: 'Successful',
          text: 'Student data update successfully',
          icon: 'success',
        });
        //this.fileDropEl.nativeElement.value = "";
        //this.stdForm.reset();
        //this.toggleList()
        //this.router.navigateByUrl('/admin/teachers/all-teachers');
      },
      (error: { message: any; error: any }) => {
        Swal.fire(
          'Failed to create course kit',
          error.message || error.error,
          'error'
        );
      }
    );
  }

  /** Get User for profile */

  getUserProfile() {
    const userId = localStorage.getItem('id');
    this.etmsService.getUserId(userId).subscribe((response: any) => {
      console.log("from_Profile",response);
        this.roname = response.roName
        this.profileForm.patchValue({
        empName: response.name,
        designation: response.designation,
        department: response.department,
        roName: response.roName,
        director: response.directorName,
        TA: response.trainingAdminName,
      })
      console.log(this.profileForm.value);
    });

  }
}
