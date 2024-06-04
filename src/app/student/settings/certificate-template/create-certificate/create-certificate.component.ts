import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CertificateService } from 'app/core/service/certificate.service';
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
      active: 'Edit certificate',
    },
  ];
  certificateForm!: FormGroup;
  isSubmitted = false;
  editUrl!: boolean;
  classId!: string;
  title: boolean = false;
  constructor(private fb:FormBuilder,
    private router: Router,
    private _activeRoute: ActivatedRoute,
    private certificateService: CertificateService,

  ){
    this._activeRoute.queryParams.subscribe((params) => {
      this.classId = params['id'];
      if (this.classId) {
        this.title = true;
      }
    });
    let urlPath = this.router.url.split('/');
    this.editUrl = urlPath.includes('certificate-builder');

    

   
  }

  // let urlPath = this.router.url.split('/');
  // this.editUrl = urlPath.includes('edit-class');

  ngOnInit(){
    this.certificateForm = this.fb.group({
      title: ['', Validators.required],
      studentName: ['', Validators.required],
      courseName: ['', Validators.required],
      completionDate: ['', Validators.required],
      text1: ['', Validators.required],
      text2: ['', Validators.required],
      text3: ['TMS Inc.', Validators.required],
      text4: ['', Validators.required],
      text5: ['', Validators.required],
      text6: ['', Validators.required],
      text7: ['', Validators.required],
      text8: ['', Validators.required],
     
    });  }
    // getSession() {
    //   let sessions: any = [];
    //   this.dataSource.forEach((item: any, index: any) => {
    //     if (
    //       this.isInstructorFailed == 0 &&
    //       item.instructor != '0'
    //       // item.lab != '0'
    //     ) {
    //       sessions.push({
    //         sessionNumber: index + 1,
    //         sessionStartDate: moment(item.start).format('YYYY-MM-DD'),
    //         sessionEndDate: moment(item.end).format('YYYY-MM-DD'),
    //         sessionStartTime: moment(item.start).format('HH:mm'),
    //         sessionEndTime: moment(item.end).format('HH:mm'),
    //         instructorId: item.instructor,
    //         // laboratoryId: item.lab,
    //         courseName: this.courseTitle,
    //         courseCode: this.courseCode,
    //         status: 'Pending',
    //         user_id: this.user_id,
    //       });
    //     } else {
    //       // this.toaster.error("Please choose Instructor and Lab")
    //       sessions = null;
    //     }
    //   });
    //   return sessions;
    // }
  

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
            text: 'Do you want to create a class!',
            icon: 'warning',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonColor: '#d33',
          }).then((result) => {
            if (result.isConfirmed) {
              this.certificateService
                .createCertificate(this.certificateForm.value)
                .subscribe((response: any) => {
                  Swal.fire({
                    title: 'Success',
                    text: 'Class Created successfully.',
                    icon: 'success',
                    // confirmButtonColor: '#d33',
                  });
                  this.router.navigateByUrl(`/student/settings/certificate/template`);
                });
            }
          });
      //  }
      }
    //   if (this.editUrl) {
    //     let sessions = this.getSession();
    //     if (sessions) {
    //       this.classForm.value.sessions = sessions;
    //       this.classForm.value.programName = this.courseTitle;
    //       Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'You want to update this class!',
    //         icon: 'warning',
    //         confirmButtonText: 'Yes',
    //         showCancelButton: true,
    //         cancelButtonColor: '#d33',
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           this._classService
    //             .updateProgramClass(this.classId, this.classForm.value)
    //             .subscribe((response: any) => {
    //               Swal.fire({
    //                 title: 'Success',
    //                 text: 'Class updated successfully.',
    //                 icon: 'success',
    //                 // confirmButtonColor: '#d33',
    //               });
    //               window.history.back();
    //             });
    //         }
    //       });
    //     }
    //   }
    // }else{
    //   this.classForm.markAllAsTouched();
    //   this.submitted = true;
    // }
    }

  // ngOnInit(){
  //   this.certificateForm = this.fb.group({
  //     studentName: ['', Validators.required],
  //     courseName: ['', Validators.required],
  //     completionDate: ['', Validators.required],
  //     website: ['www.lms.com', Validators.required],
  //     companyName: ['LMS Inc.', Validators.required],
  //     recognitionText: ['hereby recognizes that', Validators.required],
  //     completionText: ['has successfully completed the', Validators.required],
  //     authorizedText: ['Authorized and issued by:', Validators.required]
  //   });  }

}
}
