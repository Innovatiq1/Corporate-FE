import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmailConfigService } from '@core/service/email-config.service';
import { UtilsService } from '@core/service/utils.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-instructor-course-invite',
  templateUrl: './instructor-course-invite.component.html',
  styleUrls: ['./instructor-course-invite.component.scss']
})
export class InstructorCourseInviteComponent {
  edit = true;
  emailTemplateForm!: FormGroup;
  id: any;
  itemData: any; 
  pageContent: any;
  isLoading = false;
  assignData :any[] = [];
  isSubmitted=false;
  _id: number | undefined;


  public Editor: any = ClassicEditor;

  breadscrums = [
    {
      title: 'Forgot Mail',
      items: ['Email Templates'],
      active: 'Course Registered E-mail',
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
    private fb: FormBuilder,
    public utils:UtilsService, 
    private emailConfigurationService: EmailConfigService, 
    private ref: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
   
  ) { }

  ngOnInit(): void {
    this.initialize();
    
      this.getForgetPasswordTemplate();
   
  }

  toggle(_data: any){
    this.edit =!this.edit;
    this._id = _data._id;
    this.emailTemplateForm.patchValue({
      email_subject: _data.email_subject,
      email_top_header_text:_data.email_top_header_text,
      email_content:_data.email_content,
      bottom_button_text:_data.bottom_button_text,
     
    });

  }
  initialize() {
    this.createForm();
    
  }
  back(){
    this.edit =!this.edit;
  }
  fetchUpdated() {
    this.patchForm(this.itemData);
  }

  patchForm(pageContent: any) {
    this.pageContent = pageContent;
    this.emailTemplateForm.patchValue({
      email_subject: pageContent?.email_subject,
      email_top_header_text: pageContent?.email_top_header_text,
      email_content: pageContent?.email_content,
      bottom_button_text: pageContent?.bottom_button_text
    });
    // this.markAllTouched();
  }

  createForm() {
    this.emailTemplateForm = this.fb.group(
      {
        email_subject: ['', [Validators.required, ...this.utils.validators.noLeadingSpace, ...this.utils.validators.name] ],
        email_top_header_text: ['', [Validators.required, ...this.utils.validators.noLeadingSpace, ...this.utils.validators.name]],
        email_content: ['', [Validators.required,  ...this.utils.validators.noLeadingSpace, ...this.utils.validators.longDescription]],
        bottom_button_text: ['', [Validators.required,  ...this.utils.validators.noLeadingSpace, ...this.utils.validators.name]],
        
      },
    );
    this.emailTemplateForm.valueChanges.subscribe(() => {
    });
  }

  getForgetPasswordTemplate() {
    this.emailConfigurationService.getForgetPasswordTemplate().subscribe( response =>{
      this.assignData  = response?.data?.docs[0]?.new_project_add_template;
      this.ref.detectChanges();
  }
)}
removeTagsAndSpaces(inputString: string) {
  // Remove <p> tags
  const stringWithoutPTags = inputString.replace(/<p>/gi, '').replace(/<\/p>/gi, '');

  // Remove <br> tags
  const stringWithoutBrTags = stringWithoutPTags.replace(/<br\s*\/?>/gi, '');
  const stringWithoutNbsp = stringWithoutBrTags.replace(/&nbsp;/g, '');


  // Remove spaces
  //const stringWithoutSpaces = stringWithoutBrTags.replace(/\s+/g, '');

  return stringWithoutNbsp;
}
update(){
  if (this.emailTemplateForm.valid) {
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
  this.emailTemplateForm.markAllAsTouched(); 
  this.isSubmitted = true;
}
}
updateTemplate() {
  return new Promise<void>((resolve, reject) => {
    const obj = this.emailTemplateForm.value;
    obj.insertaction = 'new_project_add_template';
    this.emailConfigurationService
      .updateForgetPasswordTemplate(obj, this._id)
      .subscribe(
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
          Swal.fire('Failed to Update', 'error');
          reject();
        },
        () => {
          reject();
        }
      );
  });
}
}
