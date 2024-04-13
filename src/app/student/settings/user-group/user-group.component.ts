import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/service/user.service';
import { Users } from '@core/models/user.model';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { CoursePaginationModel } from '@core/models/course.model';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent {
  userTypeFormGroup!: FormGroup;
  users!: Users[];
  searchTerm:string = '';
  dataSource: any;
  coursePaginationModel!: Partial<CoursePaginationModel>;

  breadscrums = [
    {
      title: 'Admin',
      items: ['Manage Users'],
      active: 'User Group',
    },
  ];
  constructor(private fb: FormBuilder, private router:Router, private userService: UserService,){

    this.userTypeFormGroup = this.fb.group({
      typeName: ['', []],
      userId: new FormControl('', []),

    });
    this.coursePaginationModel = {};
  }

  ngOnInit(): void {
    this.setup();
    this.getUserGroups();
}

getUserGroups(filters?:any) {
  this.userService.getUserGroups({...this.coursePaginationModel}).subscribe((response: any) => {
    this.dataSource = response.data.docs;

  }, error => {
  });
}

setup() {
  this.userService.getAllUsers().subscribe((response: any) => {
    this.users = response?.results;
  })
}

submit() {

  if(this.userTypeFormGroup.valid){
    const courseData = this.userTypeFormGroup.value;

    let payload = {

      group_name: courseData?.typeName,
      userId: courseData?.userId
    }

    console.log(payload, 'payload')

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to create a user group!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        this.userService.saveGroups(payload).subscribe((response: any) => {
          Swal.fire({
            title: 'Successful',
            text: 'Group created successfully',
            icon: 'success',
          });
          this.getUserGroups();

          // this.courseAdded=true;
          // this.router.navigate(['/admin/courses/submitted-courses/pending-courses'])
  
        });
      }
    });
} 
}


}
