import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailConfigService } from '@core/service/email-config.service';
@Component({
  selector: 'app-read-mail',
  templateUrl: './read-mail.component.html',
  styleUrls: ['./read-mail.component.scss'],
})
export class ReadMailComponent implements OnInit {
  breadscrums = [
    {
      title: 'Read',
      items: ['Email'],
      active: 'Read',
    },
  ];
  subscribeParams: any;
  emailId: any;
  emailDetails: any;
  uploadedAttachment: any;

  constructor(private emailService:EmailConfigService,private activatedRoute:ActivatedRoute) {
    //constructor
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.emailId = params.id;
    });

  }
  ngOnInit(){
    this.getMailById();

  }
  getMailById(){
    this.emailService.getMailDetailsByMailId(this.emailId).subscribe((response: any) => {
      this.emailDetails = response;
      let attachment = this.emailDetails.attachment;
      let uploaded=attachment?.split('/')
      this.uploadedAttachment = uploaded?.pop();

  })
}
}
