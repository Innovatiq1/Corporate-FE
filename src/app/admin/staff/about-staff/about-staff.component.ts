import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { AdminService } from '@core/service/admin.service';
import { CourseService } from '@core/service/course.service';
import { TeachersService } from 'app/admin/teachers/all-teachers/teachers.service';

@Component({
  selector: 'app-about-staff',
  templateUrl: './about-staff.component.html',
  styleUrls: ['./about-staff.component.scss'],
})
export class AboutStaffComponent implements OnInit{
  breadscrums = [
    {
      title: 'Profile',
      items: ['Staff'],
      active: 'Profile',
    },
  ];
  userTypes: any;
  aboutDataId: any;
  aboutData:any
  coursePaginationModel!: Partial<CoursePaginationModel>;
  
  constructor( public _courseService:CourseService,
    private activeRoute:ActivatedRoute, ) {
    this.coursePaginationModel = {};
    this.activeRoute.queryParams.subscribe(param =>{
    console.log("params:",param['data'])
 
    this.aboutDataId = param['data'];
    })
  }
  ngOnInit() {
    this.loadData();
  }
  loadData(){
    this._courseService.getUserById( this.aboutDataId).subscribe(res => {
      this.aboutData = res;
      console.log("edit",this.aboutData)
  
    })
  }

}
