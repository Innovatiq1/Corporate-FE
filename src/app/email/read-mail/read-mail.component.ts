import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  replyForm: any;
  showReplyForm = false;
  showReplyAllForm = false;

  currentDate!: Date;
  attachment: any;
  public Editor: any = ClassicEditor;
  toMails!: string;
  filteredMails: any;
  currentTime!: string;
  showCCField = false;



  constructor(private emailService: EmailConfigService, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private certificateService: CertificateService, private router: Router) {
    this.subscribeParams = this.activatedRoute.params.subscribe((params: any) => {
      this.emailId = params.id;
    });

    this.replyForm = this.fb.group({
      attachment: ['', []],
      content: ['', []],
      to: ['', []],
      cc:['',[]]

    })


  }
  ngOnInit() {
    this.getMailById();

  }
  getMailById() {
    this.emailService.getMailDetailsByMailId(this.emailId).subscribe((response: any) => {
      this.emailDetails = response;
      this.mails = response?.mail;
      let userDetails = JSON.parse(localStorage.getItem('currentUser')!);
      this.filteredMails = this.mails.filter((mail: { from: string; to: string; }) => {
        let fromEmails = mail.from.split(',').map(email => email.trim());
        let toEmails = mail.to.split(',').map(email => email.trim());
        return fromEmails.includes(userDetails.user.email) || toEmails.includes(userDetails.user.email);
      });
      
      if (Array.isArray(this.mails)) {
        const toList = this.mails.map((mail: any) => mail.to).join(',');
        this.toMails = toList;
      }
      let attachment = this.emailDetails.attachment;
      let uploaded = attachment?.split('/')
      this.uploadedAttachment = uploaded?.pop();

    })
  }

  toggleReplyForm() {
    this.showReplyForm = !this.showReplyForm;
    const lastIndex = this.emailDetails.mail.length - 1;
    const lastEmailAddress = this.emailDetails.mail[lastIndex];
    this.replyForm.patchValue({
      to:lastEmailAddress.from,
    })
  }

  toggleReplyAllForm() {
    this.showReplyAllForm = !this.showReplyAllForm;
    const fromEmail = this.emailDetails.mail[0].from
    const toEmail = this.emailDetails.mail[0].to
    const joinedEmails = `${fromEmail},${toEmail}`;
    this.replyForm.patchValue({
      to:joinedEmails,
    })

  }

  toggleCCField() {
    this.showCCField = !this.showCCField;
  }

 
  onFileUpload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('files', file);
    this.certificateService.uploadCourseThumbnail(formData).subscribe((response: any) => {
      this.attachment = response.image_link;
      let uploaded = this.attachment.split('/')
      this.uploadedAttachment = uploaded.pop();
    });
  }


  sendReply() {
    let userDetails = JSON.parse(localStorage.getItem('currentUser')!);
    this.currentDate = new Date();
    const lastIndex = this.emailDetails.mail.length - 1;
    const lastEmailAddress = this.emailDetails.mail[lastIndex];
    this.currentDate = new Date();
    this.currentTime = this.currentDate.toLocaleTimeString();

    let payload = {
      to: this.replyForm.value.to,
      cc:this.replyForm.value.cc,
      content: this.replyForm.value.content,
      attachment: this.attachment,
      from: userDetails.user.email,
      fromName: userDetails.user.name,
      fromProfile: userDetails.user.avatar,
      date: this.currentDate,
      time:this.currentTime,
      read: false

    }
    this.emailService.replyMail(this.emailDetails.id, payload).subscribe((response: any) => {

      Swal.fire({
        title: 'Successful',
        text: 'Email sent successfully',
        icon: 'success',
      });
      this.showReplyForm = false;
      this.getMailById();
    });

  }

  replyAll() {
    let userDetails = JSON.parse(localStorage.getItem('currentUser')!);
    this.currentDate = new Date();
    this.currentTime = this.currentDate.toLocaleTimeString();
    let payload = {
      to: this.replyForm.value.to,
      cc:this.replyForm.value.cc,
      content: this.replyForm.value.content,
      attachment: this.attachment,
      from: userDetails.user.email,
      fromName: userDetails.user.name,
      fromProfile: userDetails.user.avatar,
      date: this.currentDate,
      time:this.currentTime,
      read: false
    }
    this.emailService.replyMail(this.emailDetails.id, payload).subscribe((response: any) => {

      Swal.fire({
        title: 'Successful',
        text: 'Email sent successfully',
        icon: 'success',
      });
      this.showReplyAllForm = false;
      this.getMailById();
    });

  }


}
