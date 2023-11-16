import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selectedEmails: any[] = [];
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  filterName='';


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

  performSearch() {
    if(this.filterName){
      this.getMails()
    } else {
      this.getMails()

    }
  }

  handleCheckboxSelection(email: any) {
    const index = this.selectedEmails.findIndex((selected) => selected.id === email.id);
    if (index > -1) {
      this.selectedEmails.splice(index, 1); 
    } else {
      this.selectedEmails.push(email); 
    }
  }
  deleteSelectedEmails() {
    const selectedEmailIds = this.selectedEmails.map((email) => email.id);
    const payload={
      fromStatus:'inactive',
      selectedEmailIds:selectedEmailIds
    }

      this.emailService.deleteMail(payload).subscribe((response) => {
      this.getMails();
    });
  }

  archiveEmails() {
    const selectedEmailIds = this.selectedEmails.map((email) => email.id);
    const payload={
      fromArchive:true,
      selectedEmailIds:selectedEmailIds
    }
         this.emailService.updateMail(payload).subscribe((response) => {
      this.getMails();
    });
  }


  updateEmails() {
    const selectedEmailIds = this.selectedEmails.map((email) => email.id);
    const payload={
      important:true,
      selectedEmailIds:selectedEmailIds
    }
        this.emailService.updateMail(payload).subscribe((response) => {
      this.getMails();
    });
  }

  toggleStar(email: any) {
    if(email.starred || email.fromStarred){
      email.starred = false;
    } else if(!email.starred || !email.fromStarred){
      email.starred = true;
    }
    this.selectedEmails.push(email.id)
    const payload={
      fromStarred:email.starred,
      selectedEmailIds:this.selectedEmails
    }
    this.emailService.updateMail(payload).subscribe(() => {
      this.getMails();
      this.selectedEmails=[]
    });
  }

  spamEmails() {
    const selectedEmailIds = this.selectedEmails.map((email) => email.id);
    const payload={
      fromSpam:true,
      selectedEmailIds:selectedEmailIds
    }
        this.emailService.updateMail(payload).subscribe((response) => {
      this.getMails();
    });
  }

  getMails(){
    let from= JSON.parse(localStorage.getItem('currentUser')!).user.email;
    this.emailService.getMailsByFromAddress(from,this.filterName).subscribe((response: any) => {
      this.emails = response.docs;
      this.totalItems = response.totalDocs
      this.mailPaginationModel.docs = response.docs;
      this.mailPaginationModel.page = response.page;
      this.mailPaginationModel.limit = response.limit;
      this.mailPaginationModel.totalDocs = response.totalDocs;

    });
  }
}
