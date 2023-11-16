import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { EmailConfigService } from '@core/service/email-config.service';

@Component({
  selector: 'app-starred-mail',
  templateUrl: './starred-mail.component.html',
  styleUrls: ['./starred-mail.component.scss']
})
export class StarredMailComponent {
  breadscrums = [
    {
      title: 'Starred',
      items: ['Email'],
      active: 'Starred',
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


  handleCheckboxSelection(email: any) {
    const index = this.selectedEmails.findIndex((selected) => selected.id === email.id);
    if (index > -1) {
      this.selectedEmails.splice(index, 1); // Unselect if already selected
    } else {
      this.selectedEmails.push(email); // Select if not already in the selectedEmails array
    }
  }
  deleteSelectedEmails() {
    let mailId = JSON.parse(localStorage.getItem('currentUser')!).user.email;
    const selectedEmails = this.selectedEmails; 
    const toMatch = selectedEmails.find((email) => email.to === mailId);
    const fromMatch = selectedEmails.find((email) => email.from === mailId);
  
    if (toMatch && fromMatch) {
      const payloadTo = {
        toStatus: 'inactive',
        selectedEmailIds: [toMatch.id],
      };
  
      const payloadFrom = {
        fromStatus: 'inactive',
        selectedEmailIds: [fromMatch.id],
      };
  
      this.emailService.updateMail(payloadTo).subscribe((response) => {
        this.getMails();
      });
  
      this.emailService.updateMail(payloadFrom).subscribe((response) => {
        this.getMails();
      });
  
    } else if (toMatch) {
      const payload = {
        toStatus: 'inactive',
        selectedEmailIds: [toMatch.id],
      };
  
      this.emailService.updateMail(payload).subscribe((response) => {
        this.getMails();
      });
    } else if (fromMatch) {
      const payload = {
        fromStatus: 'inactive',
        selectedEmailIds: [fromMatch.id],
      };
  
      this.emailService.updateMail(payload).subscribe((response) => {
        this.getMails();
      });
    }
  }
  updateEmails() {
    const selectedEmailIds = this.selectedEmails.map((email) => email.id);
    const payload={
      toImportant:true,
      selectedEmailIds:selectedEmailIds
    }
        this.emailService.updateMail(payload).subscribe((response) => {
      this.getMails();
    });
  }
  archiveEmails() {
    let mailId = JSON.parse(localStorage.getItem('currentUser')!).user.email;
    const selectedEmails = this.selectedEmails; 
    const toMatch = selectedEmails.find((email) => email.to === mailId);
    const fromMatch = selectedEmails.find((email) => email.from === mailId);
  
    if (toMatch && fromMatch) {
      const payloadTo = {
        toArchive: true,
        selectedEmailIds: [toMatch.id],
      };
  
      const payloadFrom = {
        fromArchive: true,
        selectedEmailIds: [fromMatch.id],
      };
  
      this.emailService.updateMail(payloadTo).subscribe((response) => {
        this.getMails();
      });
  
      this.emailService.updateMail(payloadFrom).subscribe((response) => {
        this.getMails();
      });
  
    } else if (toMatch) {
      const payload = {
        toArchive: false,
        selectedEmailIds: [toMatch.id],
      };
  
      this.emailService.updateMail(payload).subscribe((response) => {
        this.getMails();
      });
    } else if (fromMatch) {
      const payload = {
        fromArchive: false,
        selectedEmailIds: [fromMatch.id],
      };
  
      this.emailService.updateMail(payload).subscribe((response) => {
        this.getMails();
      });
    }
  }

  spamEmails() {
    let mailId = JSON.parse(localStorage.getItem('currentUser')!).user.email;
    const selectedEmails = this.selectedEmails; 
    const toMatch = selectedEmails.find((email) => email.to === mailId);
    const fromMatch = selectedEmails.find((email) => email.from === mailId);
  
    if (toMatch && fromMatch) {
      const payloadTo = {
        toSpam: true,
        selectedEmailIds: [toMatch.id],
      };
  
      const payloadFrom = {
        fromSpam: true,
        selectedEmailIds: [fromMatch.id],
      };
  
      this.emailService.updateMail(payloadTo).subscribe((response) => {
        this.getMails();
      });
  
      this.emailService.updateMail(payloadFrom).subscribe((response) => {
        this.getMails();
      });
  
    } else if (toMatch) {
      const payload = {
        toSpam: true,
        selectedEmailIds: [toMatch.id],
      };
  
      this.emailService.updateMail(payload).subscribe((response) => {
        this.getMails();
      });
    } else if (fromMatch) {
      const payload = {
        fromSpam: true,
        selectedEmailIds: [fromMatch.id],
      };
  
      this.emailService.updateMail(payload).subscribe((response) => {
        this.getMails();
      });
    }
  }

  performSearch() {
    if(this.filterName){
      this.getMails()
    } else {
      this.getMails()

    }
  }

    

  
  toggleStar(email: any) {
    if(email.starred || email.toStarred){
      email.starred = false;
    } else if(!email.starred || !email.toStarred){
      email.starred = true;
    }
    this.selectedEmails.push(email.id)
    const payload={
      toStarred:email.starred,
      selectedEmailIds:this.selectedEmails
    }
    this.emailService.updateMail(payload).subscribe(() => {
      this.getMails();
      this.selectedEmails=[]
    });
  }


  getMails(){
    let to= JSON.parse(localStorage.getItem('currentUser')!).user.email;
    this.emailService.getStarredMails(to,this.filterName).subscribe((response: any) => {
      this.emails = response.docs;
      this.totalItems = response.totalDocs
      this.mailPaginationModel.docs = response.docs;
      this.mailPaginationModel.page = response.page;
      this.mailPaginationModel.limit = response.limit;
      this.mailPaginationModel.totalDocs = response.totalDocs;

    });
  }
  

}
