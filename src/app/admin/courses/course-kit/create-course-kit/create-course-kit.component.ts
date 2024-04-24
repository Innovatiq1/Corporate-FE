import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseKit, CourseKitModel } from '@core/models/course.model';
import { CommonService } from '@core/service/common.service';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { CertificateService } from '@core/service/certificate.service';
import { FormService } from '@core/service/customization.service';

@Component({
  selector: 'app-create-course-kit',
  templateUrl: './create-course-kit.component.html',
  styleUrls: ['./create-course-kit.component.scss']
})
export class CreateCourseKitComponent implements OnInit{

  breadscrums = [
    {
      title: 'Create Course Kit',
      items: ['Settings'],
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

  isSubmitted = false;


  totalItems: any;
  currentDate: Date;
  model = { coursename: "", sd: "", ld: "", dl: "", vltitle: "", selectopt: false };
  fileDropRef: any;
  subscribeParams: any;
  courseId!: string;
  course:any;
  fileName:any;
  uploadedDocument: any;
  uploaded: any;
  documentLink:any
  docs: any;
  videoLink: any;
  videoSrc: any;
  forms!: any[];

  constructor(private router: Router,

    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private modalServices: BsModalService,
    private courseService: CourseService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private certificateService: CertificateService,
    private formService: FormService
  ) {
    this.currentDate = new Date();
    this.courseKitModel = {};




    this.courseKitForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, ...this.utils.validators.title, ...this.utils.validators.noLeadingSpace]),
      documentLink: new FormControl('', [Validators.required,  ...this.utils.validators.noLeadingSpace]),
      shortDescription: new FormControl('', [Validators.required,...this.utils.validators.descripton, ...this.utils.validators.noLeadingSpace]),
      longDescription: new FormControl('', [Validators.required,...this.utils.validators.longDescription, ...this.utils.validators.noLeadingSpace]),
      videoLink:new FormControl('', []),
      // startDate: ['', [Validators.required]],
      // endDate: ['', [Validators.required]]
      // sections: new FormControl('', [ Validators.required,...this.utils.validators.sections]),
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
    this.getForms();
    this.courseService.getAllCourseKit().subscribe(data => {
  console.log("allData",data)
 })

}
private createCourseKit(courseKitData: CourseKit): void {

  // courseKitData.documentLink=this.documentLink;
  console.log("createCourseKit",courseKitData);


  Swal.fire({
    title: 'Are you sure?',
        text: 'You want to create a course kit!',
        icon: 'warning',
        confirmButtonText: 'Yes',
        showCancelButton: true,
        cancelButtonColor: '#d33',
  }).then((result) => {
    if (result.isConfirmed) {
      this.courseService.createCourseKit(courseKitData).subscribe(
        (res) => {
          console.log("res",res)
          Swal.fire({
            title: "Successful",
            text: "Course Kit created successfully",
            icon: "success",
          });
          // this.fileDropEl.nativeElement.value = "";
          this.courseKitForm.reset();
          // this.toggleList()
          this.router.navigateByUrl("/admin/courses/course-kit");
        },
        (error) => {
          Swal.fire(
            "Failed to create course kit",
            error.message || error.error,
            "error"
          );
        }
      );
}
});

}

getForms(): void {
  this.formService.getAllForms('Course Kit Creation Form').subscribe(forms => {
    this.forms = forms;
  });
}

labelStatusCheck(labelName: string): any {
  if (this.forms && this.forms.length > 0) {
    const status = this.forms[0]?.labels?.filter((v:any) => v?.name === labelName);
    if (status && status.length > 0) {
      return status[0]?.checked;
    }
  }
  return false;
}

//videoUpload
fileBrowseHandler(event: any) {
  const file = event.target.files[0];
  this.videoLink = file;
  this.videoSrc = this.videoLink.name
}


  // fileBrowseHandler(event: any) {
  //   const files = event.target.files;
  //   this.onFileDropped(files);
  // }
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

  // Ganesh
  // onFileUpload(event:any) {
  //   const file = event.target.files[0];..
  //   this.docs = file;..
  //   this.uploadedDocument = this.docs.name;..
  //   // const formData = new FormData();
  //   // formData.append('files', file);
  //   console.log("formData",this.docs);..
  //   // this.certificateService.uploadCourseThumbnail(formData).subscribe((response:any) => {
  //   //   this.documentLink = response.image_link;
  //   //   this.uploaded=this.documentLink.split('/')
  //   //   this.uploadedDocument = this.uploaded.pop();
  //   // });
  // }


  onFileUpload(event:any) {
    const file = event.target.files[0];
    this.docs = file;
    this.uploadedDocument = this.docs.name;
    // const formData = new FormData();
    // formData.append('files', file);
    // // console.log("formData",this.docs);
    // this.certificateService.uploadCourseThumbnail(formData).subscribe((response:any) => {
    //   this.documentLink = response.image_link;
    //   this.uploaded=this.documentLink.split('/')
    //   this.uploadedDocument = this.uploaded.pop();
    // });
  }


  submitCourseKit1(){
    const formdata = new FormData();
    formdata.append('files', this.docs);
    formdata.append('files', this.videoLink);
    formdata.append('video_filename', this.videoSrc);
    formdata.append('doc_filename', this.uploadedDocument);
  this.courseService.saveVideo(formdata).subscribe(data =>{
    console.log("data",data.data);

    const courseKitData: CourseKit = this.courseKitForm.value;
    courseKitData.videoLink = data.data._id;
    courseKitData.documentLink=data.data.document;
    this.createCourseKit(courseKitData);
  })

  }
  submitCourseKit(): void {
    this.isSubmitted=true
    console.log("=========",this.courseKitForm)
    if (this.courseKitForm.valid) {
      // const courseKitData: CourseKit = this.courseKitForm.value;
          //       const loader = Swal.fire({
          //   title: 'Uploading...',
          //   text: 'Please wait...',
          //   allowOutsideClick: false,
          //   timer: 18000,
          //   timerProgressBar: true
          //   // onBeforeOpen: () => {
          //   // //   Swal.showLoading();
          //   //  },
          // })


          // this.courseService.uploadVideo(this.files).subscribe(
          //   (response: any) => {
          //     const videoId = response.videoIds;
          //     this.commonService.setVideoId(videoId)
          //     console.log("data123",videoId);
          //     courseKitData.videoLink = videoId;
          //     //this.currentVideoIds = [...this.currentVideoIds, ...videoId]
          //     // this.currentVideoIds.push(videoId);
          //     console.log("data123454",courseKitData);
          //     this.createCourseKit(courseKitData);

          //     Swal.close();
          //   },
          //   (error) => {
          //     Swal.fire({
          //       icon: 'error',
          //       title: 'Upload Failed',
          //       text: 'An error occurred while uploading the video',
          //     });
          //     Swal.close();
          //   }
          // );
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


    // getData(){
    //   forkJoin({
    //     course: this.courseService.getCourseKitById(this.courseId),

    //   }).subscribe((response: any) => {
    //     if(response){
    //       this.course = response.course;
    //       this.fileName=response?.course?.videoLink?response?.course?.videoLink[0].filename:null
    //       let startingDate=response?.course?.startDate;
    //       let endingDate=response?.course?.endDate;
    //       let startTime=response?.course?.startDate.split("T")[1];
    //       let startingTime=startTime?.split(".")[0];
    //       let endTime=response?.course?.endDate.split("T")[1];
    //       let endingTime=endTime?.split(".")[0];

    //       this.courseKitForm.patchValue({
    //         name: response?.course?.name,
    //         documentLink: response?.course?.documentLink,
    //         shortDescription: response?.course?.shortDescription,
    //         longDescription: response?.course?.longDescription,
    //         videoLink: response?.course?.videoLink?response?.course?.videoLink[0]._id:null,
    //         startDate:`${moment(startingDate).format("YYYY-MM-DD")}T${startingTime}`,
    //         endDate:`${moment(endingDate).format("YYYY-MM-DD")}T${endingTime}`

    //       });

    //     }




    //   });


    // }

}
