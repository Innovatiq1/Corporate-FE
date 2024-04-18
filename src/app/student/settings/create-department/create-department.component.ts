import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { DeptService } from '@core/service/dept.service';
import { UserService } from '@core/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent {
  departmentForm!: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Department',
      items: ['Manage Users'],
      active: 'Department',
    },
  ];
  hod: any;
  hodName: any;
  dataSource: any;
  departmentPaginationModel!: Partial<CoursePaginationModel>;
  
  constructor(private fb: UntypedFormBuilder,private deptService: DeptService,private router:Router,private userService: UserService,
    private activatedRoute:ActivatedRoute) {
    

    this.departmentForm = this.fb.group({
      department: ['', [Validators.required]],
      description: ['', [Validators.required]],
      hod: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      departmentStartDate: [''],
      studentCapacity: ['', [Validators.required]],
      details: [''],
    });
  
    this.departmentPaginationModel = {};
  }

  ngOnInit() {
    this.getAllDepartments()
  }

  onSubmit() {
 
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to create department!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        this.deptService.saveDepartment(this.departmentForm.value).subscribe((response: any) => {
          Swal.fire({
            title: 'Successful',
            text: 'Department created successfully',
            icon: 'success',
          });
          this.getAllDepartments();
          this.router.navigate(['/student/settings/create-department'])
        });
      }
    });
     
    // }
 
  }

  
  getAllDepartments(){
    this.deptService.getAllDepartments({ ...this.departmentPaginationModel, status: 'active' }).subscribe((response: { data: { docs: any; totalDocs: any; page: any; limit: any; }; }) =>{
     this.dataSource = response.data.docs;
    })
  }
}
