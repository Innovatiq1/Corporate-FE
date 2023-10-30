import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student, UserType, Users } from '@core/models/user.model';
import { AdminService } from '@core/service/admin.service';
import { UserService } from '@core/service/user.service';
import { UtilsService } from '@core/service/utils.service';
import { StudentService } from '@core/service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-all-users',
  templateUrl: './create-all-users.component.html',
  styleUrls: ['./create-all-users.component.scss']
})
export class CreateAllUsersComponent {
  isLoading = false;
  files: any;
  fileName: any;
  create = true;
  status = true;
  edit = true;
  editUrl: any;
  userForm!: FormGroup;
  isSubmitted=false;
  uploaded: any;
  uploadedImage: any;
  user: Users | undefined;
  userTypes: UserType[] | undefined;
  blogsList: any;
  currentId: string;
  hide = true;
  
  breadscrums = [
    {
      title: 'Create All Users',
      items: ['Users'],
      active: 'Create All Users',
    },
  ];

  
  update() {
    if(this.userForm.valid){
      if(this.editUrl){
        this.updateBlog(this.userForm.value)
      } else {
      this.addBlog(this.userForm.value)
      }     
        } else {
      this.isSubmitted=true;
    }
  }
  // onSubmit() {
  //   console.log('Form Value', this.stdForm.value);
  //   if (!this.stdForm.invalid) {
  //     this.StudentService.uploadVideo(this.files).subscribe(
  //       (response: any) => {
  //         const inputUrl = response.inputUrl;

  //         const userData: Student = this.stdForm.value;
  //         //this.commonService.setVideoId(videoId)

  //         userData.avatar = inputUrl;
  //         userData.filename = response.filename;
  //         userData.type = 'Student';
  //         userData.role = 'Student';
  //         userData.isLogin = true;

  //         //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
  //         // this.currentVideoIds.push(videoId);
  //         this.createInstructor(userData);

  //         Swal.close();
  //       },
  //       (error) => {
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

  addBlog(formObj:any) {
   // console.log('Form Value', formObj.value);
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
        this.router.navigate(['/admin/users/all-users'])
       
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
  onFileUpload(event:any) {
    this.fileName = event.target.files[0].name;
    this.files=event.target.files[0]
    // this.authenticationService.uploadVideo(event.target.files[0]).subscribe(
    //   (response: any) => {
    //             //Swal.close();
    //             console.log("--------",response)
    //   },
    //   (error:any) => {

    //   }
    // );


  }

  updateBlog(obj:any): any {
    return new Promise((resolve, reject) => {
      obj['Active']= this.status
      this.userService.updateUsers(obj, this.currentId).subscribe(
        (response) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Successful',
            text: 'User updated succesfully',
            icon: 'success',
          }).then(() => {
            resolve(response);
          });
          this.router.navigate(['/admin/users/all-users'])

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

  constructor(private router: Router,    private fb: FormBuilder,public utils: UtilsService, private userService: UserService,
    private adminService: AdminService,private studentService: StudentService) {
    let urlPath = this.router.url.split('/')
    this.editUrl = urlPath.includes('edit-all-users'); 
    this.currentId = urlPath[urlPath.length - 1];
    this.getUserTypeList();

    if(this.editUrl===true){
      this.breadscrums = [
        {
          title:'Edit All Users',
          items: ['Users'],
          active: 'Edit All Users',
        },
      ];
    }

    if(this.editUrl){
      this.getBlogsList();
    }

    this.userForm= this.fb.group({
      name: new FormControl('', [Validators.required,...this.utils.validators.name,...this.utils.validators.noLeadingSpace]),
      email: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password: new FormControl('', [Validators.required,...this.utils.validators.name,...this.utils.validators.noLeadingSpace]),
      qualification: new FormControl('', [Validators.required,Validators.minLength(2)]),
      type: new FormControl('', [Validators.required]),
      avatar: new FormControl('', [Validators.required]),
      status: [this.user ? (this.user.Active = this.user.Active === true ? true : false) : null],



    });
}
getUserTypeList(filters?:any) {
  this.adminService.getUserTypeList({ allRows: true }).subscribe(
    (response: any) => {
      this.userTypes = response;
    },
    (error) => {
    }
  );
}

getBlogsList(filters?:any) {
  this.userService.getUserList().subscribe((response: any) => {
    console.log('res',response);
    this.blogsList = response.data.data;
    let data=this.blogsList.find((id:any)=>id._id === this.currentId);
    console.log('data',data)
    this.fileName = data.filename
    if(data){
      this.userForm.patchValue({
        name: data?.name,
        email:data?.email,
        password: data?.password,
        qualification: data?.qualification,
        type:data?.type,
        avatar:data?.filename,
      });
    }
  }, error => {
  });
}

}
