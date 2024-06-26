import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { EmailConfigService } from '@core/service/email-config.service';

@Component({
  selector: 'app-important-mail',
  templateUrl: './important-mail.component.html',
  styleUrls: ['./important-mail.component.scss']
})
export class ImportantMailComponent {
  breadscrums = [
    {
      title: 'Important',
      items: ['Email'],
      active: 'Important',
    },
  ];
  adminUrl: boolean;
  emails: any;
  studentUrl: boolean;
  totalItems: any;
  pageSizeArr = [10, 25, 50, 100];
  mailPaginationModel: Partial<CoursePaginationModel>;
  selectedEmails: any[] = [];
  filterName='';
  @ViewChild('filter', { static: true }) filter!: ElementRef;





  constructor(private router: Router, private emailService: EmailConfigService) {
    let urlPath = this.router.url.split('/')
    this.adminUrl = urlPath.includes('admin');
    this.studentUrl = urlPath.includes('student');
    this.mailPaginationModel = {};


  }

  performSearch() {
    if(this.filterName){
      this.getMails()
    } else {
      this.getMails()

    }
  }

  pageSizeChange($event: any) {
    this.mailPaginationModel.page = $event?.pageIndex + 1;
    this.mailPaginationModel.limit = $event?.pageSize;
    this.getMails();
  }


  ngOnInit() {
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
    const selectedEmailIds = this.selectedEmails.map((email) => email.id);
    const payload = {
      toStatus: 'inactive',
      selectedEmailIds: selectedEmailIds
    }

    this.emailService.deleteMail(payload).subscribe((response) => {
      this.getMails();
    });
  }
  archiveEmails() {
    const selectedEmailIds = this.selectedEmails.map((email) => email.id);
    const payload = {
      toArchive: true,
      selectedEmailIds: selectedEmailIds
    }
    this.emailService.updateMail(payload).subscribe((response) => {
      this.getMails();
    });
  }

  updateEmails() {
    const selectedEmailIds = this.selectedEmails.map((email) => email.id);
    const payload = {
      toImportant: false,
      selectedEmailIds: selectedEmailIds
    }
    this.emailService.updateMail(payload).subscribe((response) => {
      this.getMails();
    });
  }
  spamEmails() {
    const selectedEmailIds = this.selectedEmails.map((email) => email.id);
    const payload = {
      toSpam: true,
      selectedEmailIds: selectedEmailIds
    }
    this.emailService.updateMail(payload).subscribe((response) => {
      this.getMails();
    });
  }
  navigate(email: any) {
    this.selectedEmails.push(email.id)
    const payload = {
      read: true,
      selectedEmailIds: this.selectedEmails
    }
    this.emailService.updateMail(payload).subscribe((response) => {
      this.getMails();
    });
    this.router.navigate(['/email/read-email/' + email.id])
  }


  toggleStar(email: any) {
    if (email.starred || email.toStarred) {
      email.starred = false;
    } else if (!email.starred || !email.toStarred) {
      email.starred = true;
    }
    this.selectedEmails.push(email.id)
    const payload = {
      toStarred: email.starred,
      selectedEmailIds: this.selectedEmails
    }
    this.emailService.updateMail(payload).subscribe(() => {
      this.getMails();
      this.selectedEmails = []
    });
  }

  getMails() {
    let to = JSON.parse(localStorage.getItem('currentUser')!).user.email;
    this.emailService.getImportantMailsByToAddress(to,this.filterName).subscribe((response: any) => {
      this.emails = response.docs;
      this.totalItems = response.totalDocs
      this.mailPaginationModel.docs = response.docs;
      this.mailPaginationModel.page = response.page;
      this.mailPaginationModel.limit = response.limit;
      this.mailPaginationModel.totalDocs = response.totalDocs;

    });
  }

}
