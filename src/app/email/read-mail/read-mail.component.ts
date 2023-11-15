import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '@core/service/certificate.service';
import { EmailConfigService } from '@core/service/email-config.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  mails: any;
  replyForm:any;
  showReplyForm = false;
  currentDate!: Date;
  attachment: any;
  public Editor: any = ClassicEditor;





  constructor(private emailService:EmailConfigService,private activatedRoute:ActivatedRoute,private fb:FormBuilder,
    private certificateService: CertificateService) {
    //constructor
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.emailId = params.id;
    });
    this.replyForm = this.fb.group({
      attachment:['',[]],
      content:['',[]],
    })


  }
  ngOnInit(){
    this.getMailById();

  }
  getMailById(){
    this.emailService.getMailDetailsByMailId(this.emailId).subscribe((response: any) => {
      this.emailDetails = response;
      this.mails =response?.mail;
      let attachment = this.emailDetails.attachment;
      let uploaded=attachment?.split('/')
      this.uploadedAttachment = uploaded?.pop();

  })
}

toggleReplyForm() {
  this.showReplyForm = !this.showReplyForm;
}
onFileUpload(event:any) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('files', file);

  this.certificateService.uploadCourseThumbnail(formData).subscribe((response:any) => {
    this.attachment = response.image_link;
    let uploaded=this.attachment.split('/')
    this.uploadedAttachment = uploaded.pop();
  });
}


sendReply(){
  let mail: any = [];
  let userDetails =  JSON.parse(localStorage.getItem('currentUser')!);
  this.currentDate = new Date();
  const lastIndex = this.emailDetails.mail.length - 1;
const lastEmailAddress = this.emailDetails.mail[lastIndex];

  let payload={
    to:lastEmailAddress.from,
    content:this.replyForm.value.content,
    attachment:this.attachment,
    from:userDetails.user.email,
    fromName:userDetails.user.name,
    fromProfile:userDetails.user.avatar,
    date:this.currentDate,
    read:false

  }
  this.emailService.replyMail(this.emailDetails.id,payload).subscribe((response: any) => {
     
    Swal.fire({
      title: 'Successful',
      text: 'Email sent successfully',
      icon: 'success',
    });  
    this.showReplyForm =  false; 
    this.getMailById();
  });

}

}
