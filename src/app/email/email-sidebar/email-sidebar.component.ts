import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailConfigService } from '@core/service/email-config.service';

@Component({
  selector: 'app-email-sidebar',
  templateUrl: './email-sidebar.component.html',
  styleUrls: ['./email-sidebar.component.scss']
})
export class EmailSidebarComponent {
  adminUrl: boolean;
  studentUrl: boolean;
  totalItems: any;
  totalSentItems: any;
  totalDeletedItems: any;

  constructor(private router:Router,private emailService:EmailConfigService) {
    let urlPath = this.router.url.split('/')
    this.adminUrl = urlPath.includes('admin');
    this.studentUrl = urlPath.includes('student');

  }

  ngOnInit(){
    this.getMails();
    this.getSentMails();
    this.getDeletedMails();

  }
  getMails(){
      let to= JSON.parse(localStorage.getItem('currentUser')!).user.email;
      this.emailService.getMailsByToAddress(to).subscribe((response: any) => {
        this.totalItems = response.totalDocs  
      });
  
  }
  getDeletedMails(){
    let to= JSON.parse(localStorage.getItem('currentUser')!).user.email;
    this.emailService.getDeletedMailsByToAddress(to).subscribe((response: any) => {
      this.totalDeletedItems = response.totalDocs  
    });

}

  getSentMails(){
    let from= JSON.parse(localStorage.getItem('currentUser')!).user.email;
    this.emailService.getMailsByFromAddress(from).subscribe((response: any) => {
      this.totalSentItems = response.totalDocs  
    });

}


  compose(){
    this.router.navigate(['/email/compose']);
  }

}
