import { Component, OnInit,ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CertificateService } from 'app/core/service/certificate.service';
import { forkJoin } from 'rxjs';
import { text } from 'd3';
import { CourseService } from '@core/service/course.service';
@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.scss']
})
export class CreateCertificateComponent implements OnInit {
  breadscrums = [
    {
      title: 'Certificate',
      items: ['Customize'],
      active: 'Create Certificate',
    },
  ];
  @ViewChild('backgroundTable') backgroundTable!: ElementRef;
  certificateForm!: FormGroup;
  isSubmitted = false;
  editUrl!: boolean;
  
  classId!: any;
  viewUrl: boolean;

  title: boolean = false;
  submitted : boolean = false;
  course: any;
  thumbnail: any;
  image_link: any;
  uploaded: any;
  uploadedImage: any;
  constructor(private fb:FormBuilder,
    private router: Router,
    private _activeRoute: ActivatedRoute,
    private certificateService: CertificateService,
    private courseService:CourseService, private renderer: Renderer2

  ){
    this._activeRoute.queryParams.subscribe((params) => {
      this.classId = params['id'];
      if (this.classId) {
        this.title = true;
      }
    });
    let urlPath = this.router.url.split('/');
    this.editUrl = urlPath.includes('edit');
    this.viewUrl = urlPath.includes('view');

if(this.editUrl==true)
  {
    this.breadscrums = [
      {
        title: 'Certificate',
        items: ['Certificate'],
        active: 'Edit Certificate',
      },
    ];
  }
  if(this.viewUrl==true)
    {
      this.breadscrums = [
        {
          title: 'Certificate',
          items: ['Certificate'],
          active: 'View Certificate',
        },
      ];
    }
   if(this.editUrl || this.viewUrl){
    this.getData();
   } 

  

   
  }

  edit(){
    this.router.navigate(['/student/settings/certificate/edit/:id'], {queryParams:{id:this.classId}})
    }


  // let urlPath = this.router.url.split('/');
  // this.editUrl = urlPath.includes('edit-class');
  ngOnInit(){
    this.certificateForm = this.fb.group({
      title: [''],
      user: [''],
      course: [''],
      completionDate: [''],
      text1: [''],
      text2: [''],
      text3: [''],
      text4: [''],
      text5: [''],
      text6: [''],
      text7: [''],
      text8: [''],
     
    });  }
  // ngOnInit(){
  //   this.certificateForm = this.fb.group({
  //     title: ['', Validators.required],
  //     user: ['', Validators.required],
  //     course: ['', Validators.required],
  //     completionDate: ['', Validators.required],
  //     text1: [''],
  //     text2: ['', Validators.required],
  //     text3: ['TMS Inc.', Validators.required],
  //     text4: ['', Validators.required],
  //     text5: ['', Validators.required],
  //     text6: ['', Validators.required],
  //     text7: ['', Validators.required],
  //     text8: ['', Validators.required],
     
  //   });  }
   
  onFileUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.thumbnail = file;
      const formData = new FormData();
      formData.append('files', this.thumbnail);

      this.courseService.uploadCourseThumbnail(formData).subscribe((data: any) => {
        let imageUrl = data.data.thumbnail;
        this.image_link = data.data.thumbnail
        imageUrl = imageUrl.replace(/\\/g, '/');
        imageUrl = encodeURI(imageUrl);
        this.setBackgroundImage(imageUrl);
        this.uploaded=imageUrl?.split('/')
      let image  = this.uploaded?.pop();
      this.uploaded= image?.split('\\');
      this.uploadedImage = this.uploaded?.pop();
      }, (error) => {
        console.error('Upload error:', error);
      });
    }
  }
  
    // onFileUpload(event:any) {
    //   const file = event.target.files[0];
    
    //   this.thumbnail = file
    //   const formData = new FormData();
    //   formData.append('files', this.thumbnail);
    // this.courseService.uploadCourseThumbnail(formData).subscribe((data: any) =>{
    //   this.image_link = data.data.thumbnail.replace(/\//g, '\\');
    //   this.setBackgroundImage(this.image_link);
    //   this.uploaded=this.image_link?.split('/')
    //   let image  = this.uploaded?.pop();
    //   this.uploaded= image?.split('\\');
    //   this.uploadedImage = this.uploaded?.pop();
    
    // })
    //   // this.certificateService.uploadCourseThumbnail(formData).subscribe((response:any) => {
    //   //   this.image_link = response.image_link;
    //   //   console.log("imagesss",this.image_link)
    //   //   this.uploaded=this.image_link.split('/')
    //   //   this.uploadedImage = this.uploaded.pop();
    //   //   console.log("uploaded",this.uploadedImage)
    //   //   this.firstFormGroup.patchValue({
    //   //     // image_link: response,
    //   //   });
    //   // });
    // }
    
    private setBackgroundImage(imageUrl: string) {
  
      this.backgroundTable.nativeElement.style.backgroundImage = `url("${imageUrl}")`;
      setTimeout(() => {
        const computedStyle = window.getComputedStyle(this.backgroundTable.nativeElement);
        console.log('Computed background image:', computedStyle.backgroundImage);
      }, 1000);
    }
  



    saveCertificate() {
      console.log(this.certificateForm)
      if(this.certificateForm.valid) {
      if (!this.editUrl) {
        
        //let sessions = this.getSession();
       // if (sessions) {
        //  this.certificateForm.value.sessions = sessions;
        //  this.certificateForm.value.programName = this.courseTitle;
          this.isSubmitted = true;
  
          Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to create Certificate!',
            icon: 'warning',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonColor: '#d33',
          }).then((result) => {
            if (result.isConfirmed) {
            this.certificateForm.value.image=this.image_link
              this.certificateService
                .createCertificate(this.certificateForm.value)
                .subscribe((response: any) => {
                  Swal.fire({
                    title: 'Success',
                    text: 'Certificate Created successfully.',
                    icon: 'success',
                    // confirmButtonColor: '#d33',
                  });
                  this.router.navigateByUrl(`/student/settings/certificate/template`);
                });
            }
          });
      //  }
      }
      if (this.editUrl) {
       // let sessions = this.getSession();
        // if (sessions) {
        //   this.classForm.value.sessions = sessions;
        //   this.classForm.value.programName = this.courseTitle;
          Swal.fire({
            title: 'Are you sure?',
            text: 'You want to update this class!',
            icon: 'warning',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonColor: '#d33',
          }).then((result) => {
            if (result.isConfirmed) {
              this.certificateService
                .updateCertificate(this.classId, this.certificateForm.value)
                .subscribe((response: any) => {
                  Swal.fire({
                    title: 'Success',
                    text: 'Certificate updated successfully.',
                    icon: 'success',
                    // confirmButtonColor: '#d33',
                  });
                  window.history.back();
                });
            }
          });
       // }
      }
    }else{
    //  this.classForm.markAllAsTouched();
      this.submitted = true;
    }
    }
    getData() {
      forkJoin({
       
        course: this.certificateService.getCertificateById(this.classId),
      }).subscribe((response: any) => {
     
        this.course = response.course;
       
     
        this.certificateForm.patchValue({
          title: this.course?.title,
          user:this.course?.user,
          course:this.course?.course,
          completionDate:this.course?.completionDate,
          text1:this.course?.text1,
          text2:this.course?.text2,
          text3:this.course?.text3,
          text4:this.course?.text4,
          text5:this.course?.text5,
          text6:this.course?.text6,
          text7:this.course?.text7,
          text8:this.course?.text8,
        });
      });
 
 
  }
   


}
