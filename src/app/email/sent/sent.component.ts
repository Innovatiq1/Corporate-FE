import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { EmailConfigService } from '@core/service/email-config.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {
  breadscrums = [
    {
      title: 'Sent',
      items: ['Email'],
      active: 'Sent',
    },
  ];
  adminUrl: boolean;
  emails: any;
  studentUrl: boolean;
  totalItems: any;
  pageSizeArr = [10, 25, 50, 100];
  mailPaginationModel: Partial<CoursePaginationModel>;


  constructor(private router:Router,private emailService:EmailConfigService) {
    let urlPath = this.router.url.split('/')
    this.adminUrl = urlPath.includes('admin');
    this.studentUrl = urlPath.includes('student');
    this.mailPaginationModel = {};


  }
  pageSizeChange($event: any) {
    this.mailPaginationModel.page = $event?.pageIndex + 1;
    this.mailPaginationModel.limit = $event?.pageSize;
    this.getMails();
  }
  

  ngOnInit(){
    this.getMails();

  }
  
  getMails(){
    let from= JSON.parse(localStorage.getItem('currentUser')!).user.email;
    this.emailService.getMailsByFromAddress(from).subscribe((response: any) => {
      this.emails = response.docs;
      this.totalItems = response.totalDocs
      this.mailPaginationModel.docs = response.docs;
      this.mailPaginationModel.page = response.page;
      this.mailPaginationModel.limit = response.limit;
      this.mailPaginationModel.totalDocs = response.totalDocs;

    });


  }
}
