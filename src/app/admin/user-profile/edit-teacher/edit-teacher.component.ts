import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from '@core/service/instructor.service';
import { MenuItemModel, UserType, Users } from '@core/models/user.model';
import Swal from 'sweetalert2';
import { CourseService } from '@core/service/course.service';
import { StudentsService } from 'app/admin/students/students.service';
import { TeachersService } from 'app/admin/teachers/teachers.service';
import { UtilsService } from '@core/service/utils.service';
import { UserService } from '@core/service/user.service';
import { AdminService } from '@core/service/admin.service';
import { CreateRoleTypeComponent } from 'app/admin/users/create-role-type/create-role-type.component';
import { LogoService } from 'app/student/settings/logo.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss'],
})
export class EditTeacherComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  proForm: UntypedFormGroup;

  breadscrums = [
    {
      title: 'Edit Instructor',
      items: ['Manager'],
      active: 'Edit Manager',
    },
  ];
  userId: any;
  subscribeParams: any;
  user: any;
  fileName: any;
  files: any;
  dept: any;
  avatar: any;
  uploaded: any;
  thumbnail: any;
  userTypes: UserType[] | undefined;
  head: UserType[] | undefined;
  isHead: boolean = false;
  headUsers: any;
  status = true;
  
  constructor(
    private fb: UntypedFormBuilder,
    private courseService: CourseService,
    public teachersService: TeachersService,
    private activatedRoute: ActivatedRoute,
    private StudentService: StudentsService,
    private userService: UserService,
    private adminService: AdminService,
    public utils: UtilsService,
    private instructor: InstructorService,
    private router: Router,
    public dialog: MatDialog,
    private logoService: LogoService,
  ) {
    //this.proForm = this.createContactForm();
    this.subscribeParams = this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params.id;
      }
    );
    this.proForm = this.fb.group({
      name: [
        '', 
        [Validators.required, Validators.pattern(/[a-zA-Z0-9]+/),...this.utils.validators.noLeadingSpace]
      ],
      last_name: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      // conformPassword: ['', [Validators.required]],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5), ...this.utils.validators.email],
      ],
      dob: ['', [Validators.required]],
      education: [''],
      joiningDate: ['', [Validators.required]],

      avatar: [''],
      type: ['', [Validators.required]],
      headrole: ['', [Validators.required]],
      head: ['', [Validators.required]],
    });
  }
  // onSubmit() {
  //   console.log('Form Value', this.proForm.value);
  //   if(this.proForm.valid){
  //     this.instructor.uploadVideo(this.files).subscribe(
  //       (response: any) => {
  //         const inputUrl = response.inputUrl;

  //         const userData: Users = this.proForm.value;
  //         //this.commonService.setVideoId(videoId)

  //         userData.avatar = inputUrl;
  //         userData.filename= this.fileName
  //         userData.type = "Instructor";
  //         userData.role = "Instructor";

  //         //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
  //         // this.currentVideoIds.push(videoId);
  //         this.updateInstructor(userData);

  //         Swal.close();
  //      },
  //      );
  //     }
  // }
  // onSubmit() {
  //   console.log('Form Value', this.proForm.value);

  //   // Check if the form is valid
  //   if (this.proForm.valid) {
  //     if (this.files) {
  //       // If files are present, upload the video
  //       this.instructor.uploadVideo(this.files).subscribe(
  //         (response: any) => {
  //           const inputUrl = response.inputUrl;

  //           const userData: Users = this.proForm.value;
  //           userData.avatar = inputUrl;
  //           userData.filename = this.fileName;
  //           userData.type = "Instructor";
  //           userData.role = "Instructor";

  //           this.updateInstructor(userData);

  //           Swal.close();
  //         },
  //         (error: any) => {
  //           // Handle the error during file upload
  //           console.error('File upload failed:', error);
  //         }
  //       );
  //     } else {
  //       // If no files are present, update the instructor directly
  //       const userData: Users = this.proForm.value;
  //       userData.type = "Instructor";
  //       userData.role = "Instructor";

  //       this.updateInstructor(userData);
  //     }
  //   }
  // }
  // onSubmit() {
  //   console.log('Form Value', this.proForm.value);

  //   // Check if the form is valid
  //   if (this.proForm.valid) {
  //     // Create userData object with form values
  //     const userData: Users = this.proForm.value;

  //     // Set the avatar path to the existing avatar URL
  //     userData.avatar = this.avatar;

  //     userData.type = 'Instructor';
  //     userData.role = 'Instructor';

  //     // Call the updateInstructor function with userData
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'Do You want to update this user!',
  //       icon: 'warning',
  //       confirmButtonText: 'Yes',
  //       showCancelButton: true,
  //       cancelButtonColor: '#d33',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.updateInstructor(userData);
  //         Swal.close();
  //       }
  //     });
  //   }
  // }
  update() {
    if (this.proForm.valid) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to update Manager!',
          icon: 'warning',
          confirmButtonText: 'Yes',
          showCancelButton: true,
          cancelButtonColor: '#d33',
        }).then((result) => {
          if (result.isConfirmed) {
            this.updateBlog(this.proForm.value);
          }
        });
    } 
  }
  updateBlog(formObj: any) {
    console.log('Form Value', formObj);
    if (!formObj.invalid) {
      // Prepare user data for update
      formObj['Active'] = this.status;
      formObj['role'] = formObj.type;
      formObj['isLogin'] = true;

      const userData: Users = formObj;

      // Ensure that the avatar property contains the correct URL
      userData.avatar = this.avatar; 
     
          this.updateInstructor(userData);
          
        window.history.back();
        }
      }
  private updateInstructor(userData: Users): void {
    this.teachersService.updateUser(this.userId, userData).subscribe(
      () => {
        Swal.fire({
          title: 'Successful',
          text: 'Manager updated successfully',
          icon: 'success',
        });
        //this.fileDropEl.nativeElement.value = "";
        this.proForm.reset();
        //this.toggleList()
        this.router.navigateByUrl('/admin/user-profile/managers');
      },
      (error: { message: any; error: any }) => {
        Swal.fire(
          'Failed to update manager',
          error.message || error.error,
          'error'
        );
      }
    );
  }
  ngOnInit(): void {
    //this.setup()
    this.getData();
    this.getDepartment();
    this.getUserTypeList();
  }
  getData() {
    forkJoin({
      course: this.teachersService.getUserById(this.userId),
    }).subscribe((response: any) => {
      if (response) {
        console.log('response?.course?.education', response?.course?.education);
        console.log('====REsponnse===Gopal==', response);
        //this.user = response.course;

        console.log('response?.course?.education', response?.course?.education);
        // this.fileName =response?.course?.filename
        this.avatar = response.course?.avatar;
        this.uploaded = this.avatar?.split('/');
        let image = this.uploaded?.pop();
        this.uploaded = image?.split('\\');
        this.fileName = this.uploaded?.pop();

        // this.fileName=response?.course?.videoLink?response?.course?.videoLink[0].filename:null
        // let startingDate=response?.course?.startDate;
        // let endingDate=response?.course?.endDate;
        // let startTime=response?.course?.startDate.split("T")[1];
        // let startingTime=startTime?.split(".")[0];
        // let endTime=response?.course?.endDate.split("T")[1];
        // let endingTime=endTime?.split(".")[0];

        this.proForm.patchValue({
          education: response?.course?.education,
          name: response?.course?.name,
          last_name: response?.course?.last_name,
          gender: response?.course?.gender,
          mobile: response?.course?.mobile,
          password: response?.course?.password,
          conformPassword: response?.course?.password,
          email: response?.course?.email,
          qualification: response?.course?.education,
          dob: response?.course?.dob,
          address: response?.course?.address,
          department: response?.course?.department,
          joiningDate: response?.course?.joiningDate,
          fileName: this.fileName,
          type: response?.course?.type,
            head: response?.course?.head,
            headrole: response?.course?.headrole,
        });
      }
    });
  }
  onFileUpload(event: any) {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/jfif'];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Selected format doesn't support. Only JPEG, PNG, JPG, and JFIF formats are allowed.!`,
      });
      return;
    }
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
    // this.files=event.target.files[0]
    // this.authenticationService.uploadVideo(event.target.files[0]).subscribe(
    //   (response: any) => {
    //             //Swal.close();
    //             
    //   },
    //   (error:any) => {

    //   }
    // );
  }
  cancel() {
    window.history.back();
  }

  getDepartment() {
    this.StudentService.getAllDepartments().subscribe((response: any) => {
      this.dept = response.data.docs;
      console.log('dept', this.dept);
    });
  }

  getUserTypeList(filters?: any, typeName?: any) {
    this.adminService.getUserTypeList({ allRows: true }).subscribe(
      (response: any) => {
        this.userTypes = response;
        if (typeName) {
          this.proForm.patchValue({
            type: typeName,
          });
        }
      },
      (error) => {}
    );
  }
  onSelectionChange(event: any, field: any) {
    this.isHead = true;
    this.getHeadList();
  }

  getHeadList() {
    this.userService.getAllUsersByRole(this.proForm.value.headrole).subscribe((response: any) => {
      this.headUsers = response?.results;
    });
  }
  
  openRoleModal() {
    this.logoService.getSidemenu().subscribe((response: any) => {
      let MENU_LIST = response.data.docs[0].MENU_LIST;
      const items = this.convertToMenuV2(MENU_LIST, null);
      const dataSourceArray: MenuItemModel[] = [];
      items?.forEach((item, index) => {
        if (!dataSourceArray.some((v) => v.id === item.id))
          dataSourceArray.push(item);
      });

      const dialogRef = this.dialog.open(CreateRoleTypeComponent, {
        data: dataSourceArray,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result?.typeName) {
          this.getUserTypeList(null, result?.typeName);
        }
      });
    });
  }
  convertToMenuV2(obj: any[], value: any): MenuItemModel[] {
    return obj.map((v) => {
      const menu_item = this.checkChecked(value, v?.id);
      const children =
        v?.children && v?.children.length
          ? this.convertToMenuV2(v.children, menu_item?.children)
          : [];
      const defaultCheck = this.checkChecked(value, v.id);
      let res: any = {
        title: v?.title,
        id: v?.id,
        children: [],
        checked: false,
        indeterminate: defaultCheck?.indeterminate || false,
        icon: v?.iconsrc,
      };
      if (children && children.length) {
        res = {
          ...res,
          children,
        };
        res.children = res.children.map((c: any) => ({
          ...c,
          isLeaf: true,
        }));
      }
      if (v?.actions && v?.actions?.length) {
        const actionChild = v?.actions.map((action: any) => {
          const actionChecked = this.checkChecked(
            menu_item?.children,
            `${v.id}__${action}`
          );
          return {
            title: action,
            id: `${v.id}__${action}`,
            isAction: true,
            _id: action,
            isLeaf: true,
            checked: actionChecked?.checked || false,
            indeterminate: actionChecked?.indeterminate || false,
            icon: actionChecked?.iconsrc,
          };
        });
        res = {
          ...res,
          children: actionChild,
        };
      }
      return res;
    });
  }

  checkChecked(items: any[], id: string) {
    return items?.find((v) => v.id === id);
  }
}
