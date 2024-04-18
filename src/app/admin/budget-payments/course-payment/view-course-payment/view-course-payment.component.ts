import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@core/service/course.service';
import { id } from '@swimlane/ngx-charts';
import { ClassService } from 'app/admin/schedule-class/class.service';
@Component({
  selector: 'app-view-course-payment',
  templateUrl: './view-course-payment.component.html',
  styleUrls: ['./view-course-payment.component.scss']
})
export class ViewCoursePaymentComponent {
  breadscrums = [
    {
      title: 'Payments',
      items: ['Course Payment'],
      active: 'View Course Payment',
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
  payment_intent: any;
  transactionId: any;

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
    this.payment_intent = this.dataSource.payment_intent;
    this.transactionId = this.dataSource.transactionId;

    }, (err:any) => {});
  }
  
}
