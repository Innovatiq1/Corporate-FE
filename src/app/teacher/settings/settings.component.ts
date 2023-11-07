import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'app/admin/students/all-students/students.service';
import { Student } from '@core/models/user.model';
import Swal from 'sweetalert2';
import { AuthenService } from '@core/service/authen.service';

//import { StudentsService } from 'app/admin/students/all-students/students.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class InstructorSettingsComponent {
  stdForm: UntypedFormGroup ;
  stdForm1: UntypedFormGroup ;
  editData: any;
  studentId: any;
  hide = true;
  files: any;
  fileName: any;
  avatar: any;

  breadscrums = [
    {
      title: 'Settings',
      items: ['Instructor'],
      active: 'Settings',
    },
  ];
  //studentId: any;
  

  constructor(private studentService: StudentsService,private fb: UntypedFormBuilder,private authenservice:AuthenService) {
    this.patchValues(),
    this.stdForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      password:['', ],
      currentpassword: ['', ],
      
    });
    this.stdForm1 = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      
      last_name: [''],
      
      //mobile: ['', [Validators.required]],
      city_name: ['', [Validators.required]],
      country_name: ['', [Validators.required]],
      
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
     
      address: [''],
      avatar: [''],
      

      
    });
    // constructor
  }
  patchValues(){
    this.studentId = localStorage.getItem('id')
    
   // let studentId = localStorage.getItem('id')?localStorage.getItem('id'):null
    this.studentService.getStudentById(this.studentId).subscribe((res: any) => {
    this.editData = res;
    this.fileName=this.editData.filename
      this.stdForm.patchValue({
        name: this.editData.name,
        last_name: this.editData.last_name,
        currentpassword:this.editData.password,
        
      })
      this.stdForm1.patchValue({
        name: this.editData.name,
        last_name: this.editData.last_name,
        //rollNo: this.editData.rollNo,
        //gender: this.editData.gender,
        //mobile: this.editData.mobile,
        
        email: this.editData.email,
        country_name: this.editData.country_name,
        city_name: this.editData.city_name,
        
        address: this.editData.address,
        avatar: this.editData.avatar,
        
      })
     })
  }
  onSubmit() {
    console.log('Form Value', this.stdForm.value);
    if(this.stdForm.valid){
      // this.instructor.uploadVideo(this.files).subscribe(
      //   (response: any) => {
      //     const inputUrl = response.inputUrl;

          const userData: Student = this.stdForm.value;
          //this.commonService.setVideoId(videoId)

          //userData.avatar = inputUrl;
          //userData.filename= this.fileName
          userData.type = "Instructor";
          userData.role = "Instructor";

          //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
          // this.currentVideoIds.push(videoId);
          this.updateInstructor(userData);

          Swal.close();
       // },

    }
  }
  onSubmit1(){
    console.log("========",this.stdForm1)
    if (!this.stdForm1.invalid) {
      console.log("====Test123===",)
      if(this.files){

      this.studentService.uploadVideo(this.files).subscribe(
        (response: any) => {
          const inputUrl = response.inputUrl;
          this.authenservice.updateUserProfile(response.inputUrl);

          const userData: Student = this.stdForm1.value;
          //this.commonService.setVideoId(videoId)

          userData.avatar = inputUrl;
          userData.filename = response.filename;
          userData.type = 'Instructor';
          userData.role = 'Instructor';

          //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
          // this.currentVideoIds.push(videoId);
          this.updateInstructor(userData);

          Swal.close();
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'An error occurred while uploading the video',
          });
          Swal.close();
        }
      );
    } else {
      const userData: Student = this.stdForm1.value;
          //this.commonService.setVideoId(videoId)

          //userData.avatar = inputUrl;
          //userData.filename = response.filename;
          userData.type = 'Instructor';
          userData.role = 'Instructor';
          this.updateInstructor(userData);


    }
    }


  }
  private updateInstructor(userData: Student): void {
    this.studentService.updateStudent(this.studentId,userData).subscribe(
      () => {
        Swal.fire({
          title: "Successful",
          text: "Instructor data update successfully",
          icon: "success",
        });
        //this.fileDropEl.nativeElement.value = "";
      //this.stdForm.reset();
      //this.toggleList()
      //this.router.navigateByUrl('/admin/teachers/all-teachers');
      },
      (error: { message: any; error: any; }) => {
        Swal.fire(
          "Failed to create course kit",
          error.message || error.error,
          "error"
        );
      }
    );
  }
  onFileUpload(event:any) {
    this.fileName = event.target.files[0].name;
    this.files=event.target.files[0]
    

  }
}
