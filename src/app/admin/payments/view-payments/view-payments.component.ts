import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@core/service/course.service';
import { id } from '@swimlane/ngx-charts';
import { ClassService } from 'app/admin/schedule-class/class.service';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.scss']
})
export class ViewPaymentsComponent implements OnInit {
  breadscrums = [
    {
      title: 'Payments',
      items: ['Payments'],
      active: 'View Payments',
    },
  ];
  displayedColumns: string[] = ['position', ' Class Start Date ', ' Class End Date ', 'action'];
  dataSource:any;
  feedbackForm!: FormGroup;
  course:any;
  paymentid: any;
  createdAt:any;
  paymentType:any;
  price:any;
  status:any;
  email:any;
  name:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private classService: ClassService,
    private courseService:CourseService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.queryParams.subscribe(id => {
  this.paymentid = id['id'] 
  console.log('id', this.paymentid)})
  }

  ngOnInit():void{
    this.getAllCourse();
  }

  getAllCourse(){
    this.courseService.getAllPaymentsById(this.paymentid).subscribe(response =>{
    this.dataSource = response;
    console.log("res", this.dataSource.course)
    this.course = this.dataSource.course;
    this.createdAt = this.dataSource.createdAt;
    this.paymentType = this.dataSource.paymentType;
    this.price = this.dataSource.price;
    this.status = this.dataSource.status;
    this.name = this.dataSource.name;
    this.email = this.dataSource.email;

    }, (err:any) => {});
  }
  
}
