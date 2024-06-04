// import { StudentId } from './../../schedule-class/class.model';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItemModel, Student, UserType, Users } from '@core/models/user.model';
import Swal from 'sweetalert2';
import { ConfirmedValidator } from '@shared/password.validator';
import { CourseService } from '@core/service/course.service';
import { StudentsService } from 'app/admin/students/students.service';
import { UtilsService } from '@core/service/utils.service';
import { FormService } from '@core/service/customization.service';
import { UserService } from '@core/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '@core/service/admin.service';
import { InstructorService } from '@core/service/instructor.service';
import { CreateRoleTypeComponent } from 'app/admin/users/create-role-type/create-role-type.component';
import { LogoService } from 'app/student/settings/logo.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {
  stdForm: UntypedFormGroup;
  files: any;
  fileName: any;
  avatar: any;
  userTypes: UserType[] | undefined;
  head: UserType[] | undefined;
  isHead: boolean = false;
  headUsers: any;
  status = true;
  
  breadscrums = [
    {
      title: 'Add Student',
      items: ['Staff'],
      active: 'Create Staff',
    },
  ];
  editData: any;
  StudentId: any;
  edit: boolean = false;
  viewUrl: boolean = false;
  uploaded: any;
  dept: any;
  thumbnail: any;
  forms!: any[];
  student: Student | undefined;

  constructor(
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private StudentService: StudentsService,
    private router: Router,
    private courseService: CourseService,
    public utils: UtilsService,
    private formService: FormService,
    private userService: UserService,
    private adminService: AdminService,
    private instructor: InstructorService,
    public dialog: MatDialog,
    private logoService: LogoService,

  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log('id', params);
      this.StudentId = params.id;
      this.patchValues(this.StudentId);
    });
    this.stdForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]+/),...this.utils.validators.noLeadingSpace]],
      last_name: [''],
      rollNo: ['', [Validators.required, ...this.utils.validators.noLeadingSpace,...this.utils.validators.roll_no]],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required,...this.utils.validators.mobile]],
      password: [''],
      qualification: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5),...this.utils.validators.noLeadingSpace,...this.utils.validators.email],
      ],
      parentsName: [''],
      parentsPhone: [''],
      dob: ['', [Validators.required,...this.utils.validators.dob]],
      joiningDate: ['', [Validators.required]],
      education: ['',[Validators.required, ...this.utils.validators.noLeadingSpace,...this.utils.validators.edu]],
      avatar: [''],
      blood_group: [''],
      conformPassword: ['', []],
      type: ['', [Validators.required]],
      headrole: ['', [Validators.required]],
      head: ['', [Validators.required]],

    },{
      // validator: ConfirmedValidator('password', 'conformPassword')
    });
  }

  ngOnInit(){
    this.getDepartment();
    this.getForms();
    this.getUserTypeList();
  }

  getForms(): void {
    this.formService
      .getAllForms('Staff Creation Form')
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
  
    this.courseService.uploadCourseThumbnail(formData).subscribe((data: any) => {
      this.avatar = data.data?.thumbnail;
      this.uploaded = this.avatar?.split('/');
      let image = this.uploaded?.pop();
      this.uploaded = image?.split('\\');
      this.fileName = this.uploaded?.pop();
    });
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


  private createInstructor(userData: Users): void {
    this.StudentService.saveStudent(userData).subscribe(
      () => {
        Swal.fire({
          title: 'Successful',
          text: 'Staff created successfully',
          icon: 'success',
        });
        //this.fileDropEl.nativeElement.value = "";
        this.stdForm.reset();
        //this.toggleList()
        this.router.navigateByUrl('/admin/user-profile/all-staff');
      },
      (error) => {
        Swal.fire(
          'Failed to create staff',
          error.message || error.error,
          'error'
        );
      }
    );
  }

getDepartment(){
  this.StudentService.getAllDepartments().subscribe((response: any) =>{
    this.dept = response.data.docs;
   })

}
getUserTypeList(filters?: any, typeName?: any) {
  this.adminService.getUserTypeList({ allRows: true }).subscribe(
    (response: any) => {
      this.userTypes = response;
      if (typeName) {
        this.stdForm.patchValue({
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
  this.userService.getAllUsersByRole(this.stdForm.value.headrole).subscribe((response: any) => {
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
// onSelectChange(event :any) {
//   console.log("ibstList",this.dept)
//   const filteredData = this.dept.filter((item: { id: string; }) => item.id === event.value);
//   console.log(filteredData,"filter")
//   let dept = filteredData[0].department;
//   this.stdForm.get('department')?.setValue(dept);

// }


  patchValues(id: string) {
    if (id != undefined) {
      this.viewUrl = true;
      this.edit = true;
      this.StudentService.getStudentById(id).subscribe((res) => {
        // this.fileName =res.avatar
        this.editData = res;
        this.avatar = this.editData?.avatar;
      this.uploaded=this.avatar?.split('/')
      let image  = this.uploaded?.pop();
      this.uploaded= image?.split('\\');
      this.fileName = this.uploaded?.pop();
        // this.stdForm.get('department')?.setValue(this.editData.department);
        this.stdForm.patchValue({
          name: this.editData.name,
          last_name: this.editData.last_name,
          rollNo: this.editData.rollNo,
          gender: this.editData.gender,
          mobile: this.editData.mobile,
          joiningDate: this.editData.joiningDate,
          email: this.editData.email,
          department: this.editData.department,
          parentsName: this.editData.parentsName,
          parentsPhone: this.editData.parentsPhone,
          dob: this.editData.dob,
          password: this.editData.password,
          conformPassword: this.editData.password,
          education: this.editData.education,
          blood_group: this.editData.blood_group,
          address: this.editData.address,
          fileName: this.fileName,
          type: this.editData?.type,
          head: this.editData?.head,
          headrole: this.editData?.headrole,
        },
        );
      });
    }
  }
  cancel() {

    window.history.back();
  }

  
update() {

  if (this.stdForm.valid) {
    if (this.edit) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to update staff!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateBlog(this.stdForm.value);
        }
      });
      
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to create staff!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.onSubmit(this.stdForm.value);
        }
      });
      
    }
  } else {
    this.stdForm.markAllAsTouched(); 
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
    // this.updateUser(userData);
    // Swal.close();
    }

  private updateInstructor(obj: any): void {
    this.StudentService.updateStudent(this.StudentId, obj).subscribe(
      () => {
        Swal.fire({
          title: 'Successful',
          text: 'Student details update successfully',
          icon: 'success',
        });
        //this.fileDropEl.nativeElement.value = "";
        // this.stdForm.reset();
        window.history.back();
        //this.toggleList()
        // this.router.navigateByUrl('/admin/students/all-students');
      },
      (error: { message: any; error: any }) => {
        Swal.fire(
          'Failed to update student',
          error.message || error.error,
          'error'
        );
      }
    );
  }
}
