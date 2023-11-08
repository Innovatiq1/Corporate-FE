import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CertificateService } from '@core/service/certificate.service';
import { EmailConfigService } from '@core/service/email-config.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss'],
})
export class ComposeComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public Editor: any = ClassicEditor;

  breadscrums = [
    {
      title: 'Compose',
      items: ['Email'],
      active: 'Compose',
    },
  ];
  adminUrl: boolean;
  composeForm:any;
  attachment: any;
  uploadedAttachment: any;
  studentUrl: boolean;
  subscribeParams: any;
  mailId: any;
  emailDetails: any;

  constructor(private router:Router,private fb:FormBuilder,private certificateService:CertificateService,private emailService:EmailConfigService,
    private activatedRoute:ActivatedRoute) {
    let urlPath = this.router.url.split('/')
    this.adminUrl = urlPath.includes('admin');
    this.studentUrl = urlPath.includes('student');
    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.mailId = params.id;
      //console.log("=Id===",params.id)
    });

    this.composeForm = this.fb.group({
      to: ['', []],
      subject: ['', []],
      attachment:['',[]],
      content:['',[]]
    })

  }

  ngOnInit(){
    if(this.mailId){
      this.getMailById();
    }

  }
  getMailById(){
    this.emailService.getMailDetailsByMailId(this.mailId).subscribe((response: any) => {
      let attachment = response?.attachment;
      let uploaded=attachment?.split('/')
      this.uploadedAttachment = uploaded?.pop();
      this.composeForm.patchValue({
        to:response.to,
        content:response.content,
        subject:response.subject,
      })
  })
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

  sendEmail(){
    let payload={
      to:this.composeForm.value.to,
      subject:this.composeForm.value.subject,
      content:this.composeForm.value.content,
      attachment:this.attachment,
      status:'active'
    }
    this.emailService.sendEmail(payload).subscribe((response: any) => {
       
      Swal.fire({
        title: 'Successful',
        text: 'Email sent successfully',
        icon: 'success',
      });
      if(this.adminUrl){
      this.router.navigate(['/email/admin/inbox'])
      } else if(this.studentUrl){
        this.router.navigate(['/email/student/inbox'])
      }
     
    });

  }
  draftEmail(){
    let payload={
      to:this.composeForm.value.to,
      subject:this.composeForm.value.subject,
      content:this.composeForm.value.content,
      attachment:this.attachment,
      status:'draft'
    }
    this.emailService.sendEmail(payload).subscribe((response: any) => {
             if(this.adminUrl){
      this.router.navigate(['/email/admin/inbox'])
      } else if(this.studentUrl){
        this.router.navigate(['/email/student/inbox'])
      }
     
    });

  }
  

  

}
