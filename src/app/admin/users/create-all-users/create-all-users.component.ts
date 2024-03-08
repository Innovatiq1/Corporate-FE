import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, UserType, Users } from '@core/models/user.model';
import { AdminService } from '@core/service/admin.service';
import { UserService } from '@core/service/user.service';
import { UtilsService } from '@core/service/utils.service';
import { StudentService } from '@core/service/student.service';
import Swal from 'sweetalert2';
import { CourseService } from '@core/service/course.service';

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
  thumbnail: any;
  avatar: any;

  breadscrums = [
    {
      title: 'Create All Users',
      items: ['Users'],
      active: 'Create All Users',
    },
  ];
  data: any;

  
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

  // addBlog(formObj:any) {
  //  // console.log('Form Value', formObj.value);
  //   if (!formObj.invalid) {
  //     this.studentService.uploadVideo(this.files).subscribe(
  //       (response: any) => {
  //         console.log("======",formObj.type)
  //         const inputUrl = response.inputUrl;
          
  //         formObj['Active']= this.status
  //         formObj['role']=formObj.type
  //         formObj['isLogin']=true

  //         const userData: Users = formObj;
  //         //this.commonService.setVideoId(videoId)

  //         userData.avatar = inputUrl;
  //         userData.filename = response.filename;
          
  //         //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
  //         // this.currentVideoIds.push(videoId);
  //         this.createUser(userData);

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
  addBlog(formObj: any) {
    console.log('Form Value', formObj.value);
    if (!formObj.invalid) {
      // Process form data without uploading anything
      // Additional logic can be added here as needed
      console.log("======", formObj.type);
      formObj['Active'] = this.status;
      formObj['role'] = formObj.type;
      formObj['isLogin'] = true;
  
      const userData: Users = formObj;
      userData.avatar = this.avatar;
      // You may want to set avatar and filename if needed
      // userData.avatar = 'your_avatar_url';
      // userData.filename = 'your_filename';
  
      this.createUser(userData);
  
      Swal.close();
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
    const file = event.target.files[0];
  
    this.thumbnail = file
    const formData = new FormData();
    formData.append('files', this.thumbnail);
   this.courseService.uploadCourseThumbnail(formData).subscribe((data: any) =>{
    this.avatar = data.data?.thumbnail;
    this.uploaded=this.avatar?.split('/')
    let image  = this.uploaded?.pop();
    this.uploaded= image?.split('\\');
    this.fileName = this.uploaded?.pop();
  });
    // this.fileName = event.target.files[0].name;
    // this.files=event.target.files[0]
    // this.authenticationService.uploadVideo(event.target.files[0]).subscribe(
    //   (response: any) => {
    //             //Swal.close();
    //             console.log("--------",response)
    //   },
    //   (error:any) => {

    //   }
    // );


  }

//   updateBlog(formObj:any) {
//     console.log('Form Value', formObj.value);
//       if (!formObj.invalid) {
//     if (this.files) {
//       // If files are present, upload the video
//       this.studentService.uploadVideo(this.files).subscribe(
//         (response: any) => {
//           console.log("======", formObj.type);

//           formObj['Active'] = this.status;
//           formObj['role'] = formObj.type;
//           formObj['isLogin'] = true;

//           const userData: Users = formObj;

//           // Process response if needed
//           // const inputUrl = response.inputUrl;
//           // userData.avatar = inputUrl;
//           // userData.filename = response.filename;

//           this.updateUser(userData);

//           Swal.close();
//         },
//         (error) => {
//           Swal.fire({
//             icon: 'error',
//             title: 'Upload Failed',
//             text: 'An error occurred while uploading the video',
//           });
//           Swal.close();
//         }
//       );
//     } else {
//       // If no files are present, update the user directly
//       formObj['Active'] = this.status;
//       formObj['role'] = formObj.type;
//       formObj['isLogin'] = true;

//       const userData: Users = formObj;
//       this.updateUser(userData);
//       Swal.close();
//     }
//   }
// }
updateBlog(formObj: any) {
  console.log('Form Value', formObj.value);
  if (!formObj.invalid) {
    // Prepare user data for update
    formObj['Active'] = this.status;
    formObj['role'] = formObj.type;
    formObj['isLogin'] = true;

    const userData: Users = formObj;

    // Ensure that the avatar property contains the correct URL
    userData.avatar = this.avatar // Replace 'your_existing_avatar_url' with the actual avatar URL

    this.updateUser(userData);
    Swal.close();
  }
}
  updateUser(obj:any){
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
    private adminService: AdminService,private studentService: StudentService, private activeRoute: ActivatedRoute,  private courseService: CourseService,) {
    let urlPath = this.router.url.split('/')
    this.editUrl = urlPath.includes('edit-all-users'); 
    this.currentId = urlPath[urlPath.length - 1];
    console.log(this.currentId,"+++++++++++")
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
      education: new FormControl('', [Validators.required,Validators.minLength(2)]),
      type: new FormControl('', [Validators.required]),
      avatar: new FormControl('', []),
      status: [this.user ? (this.user.Active = this.user.Active === true ? true : false) : null],
    });

    this.activeRoute.queryParams.subscribe((params) => {
      console.log("params", params['id'],);
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
  // this.userService.getUserList().subscribe((response: any) => {
  //   console.log('res',response);
  //   this.blogsList = response.data.data;
  //   let data=this.blogsList.find((id:any)=>id._id === this.currentId);
  //   console.log('data',data)
  //   this.fileName = data.filename
  //   if(data){
  //     this.userForm.patchValue({
  //       name: data?.name,
  //       email:data?.email,
  //       password: data?.password,
  //       qualification: data?.qualification,
  //       type:data?.type,
  //       avatar:data?.avatar,
  //     });
  //   }
  // }, error => {
  // });

  this.userService.getUserById(this.currentId).subscribe((response: any) => {
    console.log("listing user", response);
    this.data = response.data.data;
    // this.fileName = this.data.filename
    this.avatar =  this.data?.avatar
    this.uploaded=this.avatar?.split('/')
    let image  = this.uploaded?.pop();
    this.uploaded= image?.split('\\');
    this.fileName = this.uploaded?.pop();
    if( this.data){
          this.userForm.patchValue({
            name:  this.data?.name,
            email: this.data?.email,
            password:  this.data?.password,
            education:  this.data?.education,
            type: this.data?.type,
            fileName: this.data?.avatar,
          });
        }
      }, error => {
      });
}

}
