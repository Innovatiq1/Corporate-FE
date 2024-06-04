import { Component } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { InstructorService } from '@core/service/instructor.service';
//import { Users } from ""
import { MenuItemModel, UserType, Users } from '@core/models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '@shared/password.validator';
import { CourseService } from '@core/service/course.service';
import { StudentsService } from 'app/admin/students/students.service';
import { UtilsService } from '@core/service/utils.service';
import { FormService } from '@core/service/customization.service';
import { UserService } from '@core/service/user.service';
import { AdminService } from '@core/service/admin.service';
import { CreateRoleTypeComponent } from 'app/admin/users/create-role-type/create-role-type.component';
import { MatDialog } from '@angular/material/dialog';
import { LogoService } from 'app/student/settings/logo.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss'],
})
export class AddTeacherComponent {
  proForm: UntypedFormGroup;
  dept: any;
  uploaded: any;
  thumbnail: any;
  avatar: any;
  submitClicked: boolean = false;
  status = true;
  breadscrums = [
    {
      title: 'Add Instructor',
      items: ['Manager'],
      active: 'Create Manager',
    },
  ];
  files: any;
  fileName: any;
  forms!: any[];
  userTypes: UserType[] | undefined;
  head: UserType[] | undefined;
  isHead: boolean = false;
  headUsers: any;

  constructor(private fb: UntypedFormBuilder,
    private instructor: InstructorService,
    private StudentService: StudentsService,
    private courseService: CourseService,
    private userService: UserService,
    private adminService: AdminService,
    public utils: UtilsService,
    private router:Router,
    private formService: FormService,
    public dialog: MatDialog,
    private logoService: LogoService,

   ) {
    this.proForm = this.fb.group({
      name: ['', [Validators.required,Validators.pattern(/[a-zA-Z0-9]+/),...this.utils.validators.noLeadingSpace]],
      last_name: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required,...this.utils.validators.noLeadingSpace,...this.utils.validators.mobile]],
      password: ['', [Validators.required]],
      // conformPassword: ['', [Validators.required]],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5),...this.utils.validators.noLeadingSpace,...this.utils.validators.email],
      ],
      dob: ['', [Validators.required]],
      joiningDate:['', [Validators.required]],
      education: ['', [Validators.required,...this.utils.validators.designation]],
      avatar: ['',],
      type: ['', [Validators.required]],
      headrole: ['', [Validators.required]],
      head: ['', [Validators.required]],
    },{
      // validator: ConfirmedValidator('password', 'conformPassword')
    });
  }


  onFileUpload(event:any) {
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
    this.thumbnail = file
    const formData = new FormData();
    formData.append('files', this.thumbnail);
   this.courseService.uploadCourseThumbnail(formData).subscribe((data: any) =>{
    this.avatar = data.data.thumbnail;
    this.uploaded=this.avatar.split('/')
    let image  = this.uploaded.pop();
    this.uploaded= image.split('\\');
    this.fileName = this.uploaded.pop();
  });
 

  }
  getDepartment(){
    this.StudentService.getAllDepartments().subscribe((response: any) =>{
      this.dept = response.data.docs;
      console.log("dept",this.dept)
     })

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
update(){
 
    this.onSubmit(this.proForm.value);
}
  onSubmit(formObj: any) {
    console.log('Form Value', formObj);


    if (!formObj.invalid) {
      console.log('======', formObj.type);
      formObj['Active'] = this.status;
      formObj['role'] = formObj.type;
      formObj['isLogin'] = true;

      const userData: Users = formObj;
      userData.avatar = this.avatar;
     
      this.createInstructor(userData);
     
    }
  }
//   onSubmit() {
//     console.log('Form Value', this.proForm.value);
//     if (!this.proForm.invalid) {
//         const userData: Users = this.proForm.value;
        
//         // Set the avatar path to the URL received during file upload
//         userData.avatar = this.avatar;
        
//         // userData.type = 'Manager';
//         // userData.role = 'Manager';
//         userData.isLogin = true;

//         this.createInstructor(userData);
//     }else{
//       this.proForm.markAllAsTouched(); 
//       this.submitClicked = true;
//     }
// }

  ngOnInit(){
    this.getDepartment();
    this.getForms();
    this.getUserTypeList();
  }

  getForms(): void {
    this.formService
      .getAllForms('Manager Creation Form')
      .subscribe((forms) => {
        this.forms = forms;
      });
  }

  labelStatusCheck(labelName: string): any {
    if (this.forms && this.forms.length > 0) {
      const status = this.forms[0]?.labels?.filter(
        (v: any) => v?.name === labelName
      );
      if (status && status.length > 0) {
        return status[0]?.checked;
      }
    }
    return false;
  }

  
  private createInstructor(userData: Users): void {


    Swal.fire({
      title: 'Are you sure?',
      text: 'Do You want to create a Manager!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        this.instructor.CreateUser(userData).subscribe(
          () => {
            Swal.fire({
              title: "Successful",
              text: "Manager created successfully",
              icon: "success",
            });
            //this.fileDropEl.nativeElement.value = "";
          this.proForm.reset();
          //this.toggleList()
          this.router.navigateByUrl('/admin/user-profile/managers');
          },
          (error) => {
            Swal.fire(
              "Failed to create manager",
              error.message || error.error,
              "error"
            );
          }
        );
      }
    });
   
  }
  cancel(){
    // this.router.navigateByUrl('/admin/users/all-instructors');
window.history.back();
  }
}
