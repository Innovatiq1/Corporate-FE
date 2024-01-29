import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/models/user';
import { AuthService } from '@core/service/auth.service';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-department-budget',
  templateUrl: './create-department-budget.component.html',
  styleUrls: ['./create-department-budget.component.scss']
})
export class CreateDepartmentBudgetComponent implements OnInit  {
  breadscrums = [
    {
      title: 'Over All Budget',
      // items: ['Extra'],
      active: 'Create Department',
    },
  ];
  authForm!: UntypedFormGroup;
  departmentForm: UntypedFormGroup;
  editUrl: boolean;
  subscribeParams: any;
  departmentId: any;
  users!: User[];
  constructor(private fb: UntypedFormBuilder,private courseService: CourseService,private router:Router,
    private activatedRoute:ActivatedRoute,  private authService: AuthService, public utils:UtilsService) {
    let urlPath = this.router.url.split('/')
    this.editUrl = urlPath.includes('edit-department-budget'); 
    if(this.editUrl===true){
      this.breadscrums = [
        {
          title:'Overall Budget',
          // items: ['Department'],
          active: 'Edit Department',
        },
      ];
     
    }

    this.departmentForm = this.fb.group({
      department: ['',[Validators.required,...this.utils.validators.dname, this.utils.noLeadingSpace]],
      director: ['', [Validators.required]],
      percentage: ['', [Validators.required,...this.utils.validators.percentage, this.utils.noLeadingSpace]],
      value: ['', [Validators.required,...this.utils.validators.value, this.utils.noLeadingSpace]],
      trainingBudget: ['', [Validators.required,...this.utils.validators.budget, this.utils.noLeadingSpace]],
      budget: ['',[Validators.required,...this.utils.validators.value, this.utils.noLeadingSpace]],
     
    });
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.departmentId = params.id;
    });
    if(this.editUrl){
      // this.getDepartmentById();
    }
  }
 ngOnInit(): void {
  // this.loadUsers();
 }
 
    // private loadUsers() {
    //   this.authService.getDirectorHeads().subscribe(
    //     (response: any) => {
    //       this.users = response.data;
    //     },
    //     (error) => {
    //     }
    //   );
    // }
 
  // getDepartmentById(){
  //   this.courseService.getDepartmentById(this.departmentId).subscribe((response:any)=>{
  //     let details = response;
  //     this.departmentForm.patchValue({
  //       department:response?.department,
  //       hod:response?.hod,
  //       trainingBudget:response?.trainingBudget,
  //       percentage:response?.percentage,
  //       value:response?.value,
  //       budget:response?.budget,
  //     })

  //   })
  // }

  onSubmit() {
    // if (this.departmentForm.valid) {
    //   if (this.editUrl) {
    //     this.courseService.updateDepartment(this.departmentForm.value, this.departmentId).subscribe((response: any) => {
    //       Swal.fire({
    //         title: 'Successful',
    //         text: 'Department updated successfully',
    //         icon: 'success',
    //       });
    //       this.router.navigate(['/admin/budget/dept-budget'])
    //     });
  
    //   } else {
    //     this.courseService.saveDepartment(this.departmentForm.value).subscribe((response: any) => {
    //       Swal.fire({
    //         title: 'Successful',
    //         text: 'Department created successfully',
    //         icon: 'success',
    //       });
    //       this.router.navigate(['/admin/e-tms/department-budget-allocation'])
    //     });
    //   }
    // } else {
     
    // }
  }

}
