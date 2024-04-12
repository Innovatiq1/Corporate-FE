import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { DeptService } from '@core/service/dept.service';
import { Department } from 'app/admin/departments/department.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.scss']
})
export class ViewDepartmentComponent implements OnInit{
  breadscrums = [
    {
      title: 'Blank',
      items: ['Users'],
      active: 'View Departments',
    },
  ];

  aboutData1!: any;
  subscribeParams: any;
  departmentId: any;
  id?: number;
  department?: Department;
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private deptService:DeptService,
    private router: Router,
  ) {
    
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.departmentId = params.id;
    });
  }
  ngOnInit() {
    // this.loadData();
    this.loadData()
  }

  loadData(){
  this.deptService.getDepartmentById(this.departmentId).subscribe((response:any)=>{
    this.aboutData1 = response;
   

  })
}
delete(id: string) {
  // this.classService.getClassList({ courseId: id }).subscribe((classList: any) => {
  //   const matchingClasses = classList.docs.filter((classItem: any) => {
  //     return classItem.courseId && classItem.courseId.id === id;
  //   });
    // if (matchingClasses.length > 0) {
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'Classes have been registered with this course. Cannot delete.',
    //     icon: 'error',
    //   });
    //   return;
    // }
    this.deptService.deleteDepartment(id).subscribe(() => {
      this.loadData();
      this.router.navigate(['/student/settings/all-departments'])
      Swal.fire({
        title: 'Success',
        text: 'Department deleted successfully.',
        icon: 'success',
      });
    });
  // });
}
editCall(row: Department) {
  this.id = row.id;
  this.router.navigate(['/admin/departments/edit-department/' + this.id])

}

}
