import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseKit, CourseKitModel } from '@core/models/course.model';
import { CertificateService } from '@core/service/certificate.service';
import { CommonService } from '@core/service/common.service';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-program-kit',
  templateUrl: './edit-program-kit.component.html',
  styleUrls: ['./edit-program-kit.component.scss']
})
export class EditProgramKitComponent {
  breadscrums = [
    {
      title: 'Create Course Kit',
      items: ['Course'],
      active: 'Create Course Kit',
    },
  ];
  @ViewChild("fileDropRef", { static: false })
  currentVideoIds: string[] = [];
  fileDropEl!: ElementRef;
  courseKitModel!: Partial<CourseKitModel>
  files: any[] = [];
  templates: any[] = [];
  list = true;
 // edit = false;
  courseKits!: any;
  courseKitForm!: FormGroup;
  pageSizeArr = this.utils.pageSizeArr;
  dataSource: any;
  displayedColumns!: string[];
  viewUrl: any;
  isSubmitted = false;
  editUrl: any;
  //viewUrl: any;
  totalItems: any;
  currentDate: Date;
  model = { coursename: "", sd: "", ld: "", dl: "", vltitle: "", selectopt: false };
  fileDropRef: any;
  subscribeParams: any;
  courseId!: string;
  course:any;
  fileName:any;
  mode: string = 'editUrl';
  documentLink: any;
  uploaded: any;
  uploadedDocument: any;

  constructor(private router: Router,

    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private modalServices: BsModalService,
    private courseService: CourseService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private certificateService: CertificateService
  ) {
    this.currentDate = new Date();
    this.courseKitModel = {};
    let urlPath = this.router.url.split('/')
    this.editUrl = urlPath.includes('edit-program-kit');
    this.viewUrl = urlPath.includes('view-program-kit');

    if(this.editUrl===true){
      this.breadscrums = [
        {
          title:'Edit Program Kit',
          items: ['Program'],
          active: 'Edit Program Kit',
        },
      ];
    }
    else if(this.viewUrl===true){
      this.breadscrums = [
        {
          title:'View Program Kit',
          items: ['Program'],
          active: 'View Program Kit',
        },
      ];
    }

    this.courseKitForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, ...this.utils.validators.title, ...this.utils.validators.noLeadingSpace]),
      documentLink: new FormControl('', [Validators.required,  ...this.utils.validators.noLeadingSpace]),
      shortDescription: new FormControl('', [Validators.required,...this.utils.validators.descripton, ...this.utils.validators.noLeadingSpace]),
      longDescription: new FormControl('', [Validators.required,...this.utils.validators.longDescription, ...this.utils.validators.noLeadingSpace]),
      videoLink:new FormControl('', []),
    });

    this.subscribeParams = this.activatedRoute.params.subscribe((params:any) => {
      this.courseId = params.id;
    });

  }
  dateValidator(group: FormGroup) {
    const startDate = group.get('startDate')?.value; 
    const endDate = group.get('endDate')?.value;       

    if (startDate && endDate) {
      if (startDate > endDate) {
        group.get('endDate')?.setErrors({ dateError: true }); 
      } else {
        group.get('endDate')?.setErrors(null); 
      }
    }
  }
  initCourseKitForm(): void {
    this.courseKitForm = this.formBuilder.group({
      name: ["", Validators.required],
      shortDescription: [""],
      longDescription: [""],
      videoLink: [""],
      documentLink: [""],
    });
  }
  startDateChange(element: { end: any; start: any; }) {
    element.end = element.start;
  }
ngOnInit(): void {
  if(this.editUrl){
    this.getData();
  }
 

  if(this.viewUrl){
    this.getData();
    this.mode = 'viewUrl';

  }

}
  
  fileBrowseHandler(event: any) {
    const files = event.target.files;
    this.onFileDropped(files);
  }
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      this.model.vltitle = item.name;
    }
    //this.fileDropEl.nativeElement.value = "";
  }
  onFileUpload(event:any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('files', file);
    this.certificateService.uploadCourseThumbnail(formData).subscribe((response:any) => {
      this.documentLink = response.image_link;
      this.uploaded=this.documentLink.split('/')
      this.uploadedDocument = this.uploaded.pop();
    });
  }

  submitCourseKit(): void {
    const courseKitData: CourseKit = this.courseKitForm.value;
    courseKitData.documentLink=this.documentLink
 
    if (this.courseKitForm.valid) {
    
      const updatedCourseKit: CourseKit = {
        id: this.courseId,
        ...this.courseKitForm.value,

      };
      Swal.fire({
        title: 'Uploading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        timer: 18000,
        timerProgressBar: true
        // onBeforeOpen: () => {
        // //   Swal.showLoading();
        //  },
      })
      // this.courseService
      //   .editProgramCourseKit(this.courseId, updatedCourseKit)
      //   .subscribe(
      //     () => {
      //       Swal.fire({
      //         title: "Updated",
      //         text: "Program Kit updated successfully",
      //         icon: "success",
      //       });
      //       //this.modalRef.close();
      //       this.router.navigateByUrl('/admin/program/program-kit');
      //     },
          
          
      //   );
      
      this.courseService.uploadVideo(this.files).subscribe(
        (response: any) => {
          const videoId = response.videoIds;
          this.commonService.setVideoId(videoId)

          courseKitData.videoLink = videoId;
          //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
          // this.currentVideoIds.push(videoId);
          this.editProgramCourseKit(courseKitData);

          Swal.close();
        },
        (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'An error occurred while uploading the video',
          });
          Swal.close();
        }
      );
      // } else {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Invalid File Type',
      //     text: 'Please upload video files',
      //   });
      // }
    }

    else {
      //this.createCourseKit(courseKitData);
      // this.isSubmitted=false
    }
    
  }

  private editProgramCourseKit(courseKitData: CourseKit): void {
    courseKitData.documentLink=this.documentLink
    const updatedCourseKit: CourseKit = {
      id: this.courseId,
        ...this.courseKitForm.value,
    
       };
       
    this.courseService.editProgramCourseKit(this.courseId, updatedCourseKit).subscribe(
      () => {
        Swal.fire({
          title: "Updated",
          text: "Program Kit Updated successfully",
          icon: "success",
        });
        //this.fileDropEl.nativeElement.value = "";
        this.courseKitForm.reset();
        //this.toggleList()
        //this.router.navigateByUrl("/admin/courses/create-template");
        this.router.navigateByUrl('/admin/program/program-kit-template');
        //this.router.navigateByUrl('/admin/program/program-kit');

      },
      (error) => {
        Swal.fire(
          "Failed to create program kit",
          error.message || error.error,
          "error"
        );
      }
    );
  }
  isInputReadonly(): boolean {
    return this.mode === 'viewUrl'; // If mode is 'viewUrl', return true (readonly); otherwise, return false (editable).
  } 

    getData(){
      forkJoin({
        course: this.courseService.getProgramKitsById(this.courseId),
        
      }).subscribe((response: any) => {
        if(response){
          this.course = response.course;
          this.fileName=response?.course?.videoLink?response?.course?.videoLink[0].filename:null
          this.documentLink = response.course?.documentLink;
        this.uploaded=this.documentLink.split('/')
        this.uploadedDocument = this.uploaded.pop();  
          this.courseKitForm.patchValue({
            name: response?.course?.name,
            shortDescription: response?.course?.shortDescription,
            longDescription: response?.course?.longDescription,
            videoLink: response?.course?.videoLink?response?.course?.videoLink[0]._id:null,            
          });
  
        }
       
        
        
        
      });
    
  
    }

}


