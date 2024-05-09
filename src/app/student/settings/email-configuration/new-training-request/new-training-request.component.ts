import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmailConfigService } from '@core/service/email-config.service';
import { UtilsService } from '@core/service/utils.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-training-request',
  templateUrl: './new-training-request.component.html',
  styleUrls: ['./new-training-request.component.scss']
})
export class NewTrainingRequestComponent {
  newTrainingReqForm:FormGroup  ;
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
  // _id:any ;
  isSubmitted=false;
  id: any;
  //forgot password

  assignData :any[] = [];
  public Editor: any = ClassicEditor;
  itemData: any;
  pageContent: any;
 
  breadscrums = [
    {
      title: 'Forgot Mail',
      items: ['Email Templates'],
      active: 'New Training Request',
    },
  ];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  constructor(
     private emailConfigurationService: EmailConfigService,
     private router: Router,
     private formBuilder: FormBuilder, 
     public utils:UtilsService, 
     private ref: ChangeDetectorRef,)
     {
    this.newTrainingReqForm = this.formBuilder.group({
      email_subject: ['', [Validators.required, ...this.utils.validators.noLeadingSpace, ...this.utils.validators.name] ],
      email_top_header_text: ['', [Validators.required, ...this.utils.validators.noLeadingSpace, ...this.utils.validators.name]],
      email_content: ['', [Validators.required,  ...this.utils.validators.noLeadingSpace, ...this.utils.validators.longDescription]],
    });
  }

  ngOnInit(){
    this.getNewTrainingReqTemplate();
  }
  fetchUpdated() {
    this.patchForm(this.itemData);
  }
  patchForm(pageContent: any) {
    this.pageContent = pageContent;
    this.newTrainingReqForm.patchValue({
      email_template_type: pageContent?.email_template_type,
      email_subject: pageContent?.email_subject,
      email_top_header_text: pageContent?.email_top_header_text,
      email_content: pageContent?.email_content,
    });

  }

  getNewTrainingReqTemplate() {
    this.emailConfigurationService.getForgetPasswordTemplate().subscribe( response =>{
      this.assignData  = response?.data?.docs[0]?.new_course_request_template;
      this.ref.detectChanges();
    }, error => {
      // this.isLoading = false;
    }); 
  }

  update(){
    if (this.newTrainingReqForm.valid) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update template!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateTemplate();
      }
    });
  } else {
    this.newTrainingReqForm.markAllAsTouched(); 
    this.isSubmitted = true;
  }
  }
  updateTemplate() {
    return new Promise<void>((resolve, reject) => {
          const obj = this.newTrainingReqForm.value;
          obj.insertaction = 'new_course_request_template';
          this.emailConfigurationService.updateForgetPasswordTemplate(obj, this.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Update data Succesfully',
                icon: 'success',
              });
              
             this.back();
              resolve();
              this.getNewTrainingReqTemplate(); 
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
    // this._id = _data._id;
    this.newTrainingReqForm.patchValue({
      email_subject: _data.email_subject,
      email_content:_data.email_content,
      // email_template_type:_data.email_template_type,
      email_top_header_text: _data.email_top_header_text
    });

  }
}
