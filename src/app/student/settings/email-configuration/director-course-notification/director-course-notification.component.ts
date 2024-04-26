import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmailConfigService } from '@core/service/email-config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-director-course-notification',
  templateUrl: './director-course-notification.component.html',
  styleUrls: ['./director-course-notification.component.scss']
})
export class DirectorCourseNotificationComponent {
  updateStudentRef:FormGroup  ;
  edit = true;
  welcomeUrl: any;
  trainerUrl: any;
  rejectUrl: any;  
  studentrefUrl: any;
  courserefUrl: any;
  completecourseUrl : any;
  instcourseinvtUrl : any;
  instacptcrsinvtstsUrl : any;
  sendcourseinvoiceUrl : any;
  adminnewmailUrl : any;
  _id:any ;
  //forgot password

  assignData :any[] = [];
  public Editor: any = ClassicEditor;
 
  breadscrums = [
    {
      title: 'Forgot Mail',
      items: ['Email Configuration'],
      active: 'Director Course Notification',
    },
  ];
  constructor(private emailConfigurationService: EmailConfigService, private router: Router,private formBuilder: FormBuilder){

   


    this.updateStudentRef = this.formBuilder.group({
      email_subject: ['',[Validators.required]],
      email_content: ['',[Validators.required]],
      email_template_type:[''],
      email_top_header_text: [''],
    });
  }

  ngOnInit(){
    this.getForgetPasswordTemplate();
  }
  
  getForgetPasswordTemplate() {
    this.emailConfigurationService.getForgetPasswordTemplate().subscribe( response =>{
      this.assignData  = response?.data?.docs[0]?.director_course_notification;
     
    }, error => {
      // this.isLoading = false;
    }); 
  }

  update() {
    return new Promise<void>((resolve, reject) => {
          const obj = this.updateStudentRef.value;
          obj.insertaction = 'director_course_notification';
          this.emailConfigurationService.updateForgetPasswordTemplate(obj, this._id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Update data Succesfully',
                icon: 'success',
              });
              this.getForgetPasswordTemplate(); 
             this.back();
              resolve();
            },
            (err) => {
              Swal.fire(
                'Failed to Update',
                'error'
              );
              reject();
            },
            () => {
              reject();
            });
        });
      }

  back(){
    this.edit =!this.edit;
  }

  toggle(_data: any){
    this.edit = !this.edit;
    this._id = _data._id;
    this.updateStudentRef.patchValue({
      email_subject: _data.email_subject,
      email_content:_data.email_content,
      email_template_type:_data.email_template_type,
      email_top_header_text: _data.email_top_header_text
    });

  }
}
