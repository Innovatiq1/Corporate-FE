import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EmailConfigService } from '@core/service/email-config.service';
import { UtilsService } from '@core/service/utils.service';
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
  assignData = [];
  isSubmitted=false;

  public Editor: any = ClassicEditor;

  breadscrums = [
    {
      title: 'Forgot Mail',
      items: ['Email Configuration'],
      active: 'Instructor Course Invite',
    },
  ];
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
    // this._id = _data._id;
    this.emailTemplateForm.patchValue({
      email_subject: _data.email_subject,
      email_top_header_text:_data.email_top_header_text,
      email_content:_data.email_content,
     
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
    });
    // this.markAllTouched();
  }

  createForm() {
    this.emailTemplateForm = this.fb.group(
      {
        email_subject: ['', [Validators.required]],
        email_top_header_text: ['', [Validators.required]],
        email_content: ['', [Validators.required]],
        
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
  return new Promise<void>((resolve, reject) => {
    // this.markAllTouched();
    if (this.emailTemplateForm.valid) {
      
        let obj = this.emailTemplateForm.value;
        let test =obj.email_content
        

        //const stringWithoutSpaces = test.replace(/\s+/g, '');

        // Remove <p> tags
        const stringWithoutPTags = this.removeTagsAndSpaces(test)
        obj['email_content']=stringWithoutPTags
        console.log("stringWithoutPTags",stringWithoutPTags)
      

        obj['insertaction'] = 'new_project_add_template';
        this.emailConfigurationService.updateForgetPasswordTemplate(obj,this.id).subscribe(
          (res) => {
            Swal.fire({
              title: 'Successful',
              text: 'Update data Succesfully',
              icon: 'success',
            });
            this.back();
            resolve();
            this.getForgetPasswordTemplate();
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
          }
        );
      }
    }
  )};
}
