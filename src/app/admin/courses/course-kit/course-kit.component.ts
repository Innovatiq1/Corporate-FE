import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseKitModel, CourseModel, CoursePaginationModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';
import {  BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import { VideoPlayerComponent } from './video-player/video-player.component';
import { TableElement, TableExportUtil } from '@shared';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AdminService } from '@core/service/admin.service';

@Component({
  selector: 'app-course-kit',
  templateUrl: './course-kit.component.html',
  styleUrls: ['./course-kit.component.scss']
})
export class CourseKitComponent implements OnInit{
  displayedColumns: string[] = [
    // 'select',
    'Course',
    'Short Description',
    'Long Description',
    'Video Link',
    'Document Link'
  ];

  breadscrums = [
    {
      title: 'Course Kit',
      items: ['Course'],
      active: 'Course Kit',
    },
  ];

  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  selection = new SelectionModel<CourseModel>(true, []);
  dataSource: any;
  isLoading = true;
  courseKitModel!: Partial<CourseKitModel>;
  templates: any[] = [];
  currentDate: Date;
  searchTerm: string = '';
  actionItems: any[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public utils: UtilsService,
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    private modalServices: BsModalService,
    private adminService: AdminService
  ) {
    this.currentDate = new Date();
    this.courseKitModel = {};
     this.adminService.filterAndReturnValue("course-kit").subscribe(value=>{
      this.actionItems = value?.map((action:any)=>action.id.split("__")[1]) || []
     });
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  ngOnInit(){
    this.fetchCourseKits();
    this.getJobTemplates();
  }

  checkActionAccess(action:string):boolean{
    return this.actionItems?.length ? this.actionItems.includes(action): true
  }

  fetchCourseKits() {
    this.courseService.getCourseKit({ ...this.courseKitModel })
      .subscribe(response => {
        this.isLoading = false;
        console.log("===response==",response)
        this.totalItems = response.totalDocs

        this.dataSource = response.docs;
        this.courseKitModel.docs = response.docs;
        this.courseKitModel.page = response.page;
        this.courseKitModel.limit = response.limit;
        this.courseKitModel.totalDocs = response.totalDocs;

        this.getJobTemplates();

      }, (error) => {

      });

//  chaged by Ganesh

// this.courseService.getAllCourseKit().subscribe(response => {
//   console.log("allData",response.data);
//   if(response){
//   this.isLoading = false;
//   this.dataSource = response.data.docs;
//     this.courseKitModel.docs = response.data.docs;
//     this.courseKitModel.page = response.data.page;
//     this.courseKitModel.limit = response.data.limit;
//     this.courseKitModel.totalDocs = response.data.totalDocs;
//     this.getJobTemplates();

//   }

//  },
//  (error) => {

//  })



  }

  getJobTemplates() {
    this.courseService.getJobTempletes().subscribe(
      (data: any) => {
        this.templates = data.templates;
      },
      (error) => {
        console.error('Error fetching job templates:', error);
      }
    );
  }

  playVideo(video: { video_url: any; }): void {
    console.log('Video',video)
    if (video?.video_url) {
      this.openVidePlayer(video);
    } else {
      console.error("Invalid video URL");
    }
  }

  openVidePlayer(videoLink: { video_url?: any; id?: any; }): void {
    // const { videoLink } = videoLink;
    if (videoLink?.id) {
      const videoURL = videoLink.video_url;
      // this.courseService.getVideoById(videoId).subscribe((res) => {
      //   const videoURL = res.data.videoUrl;
        if (!videoURL) {
          Swal.fire({
            icon: "error",
            title: "Video Convert is Pending",
            text: "Please start convert this video",
          });
          return

        }
        // const videoType = "application/x-mpegURL";
        if (videoURL) {
          const initialState: ModalOptions = {
            initialState: {
              videoURL,
              // videoType,
            },
            class: "videoPlayer-modal",
          };
          this.modalServices.show(VideoPlayerComponent, initialState);
        }
      // });
    }
  }

  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  deleteItem(item: any) {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this course kit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourseKit(item._id).subscribe(
          () => {
            Swal.fire({
              title: "Deleted",
              text: "Course Kit deleted successfully",
              icon: "success",
            });
            this.fetchCourseKits();
          },
          (error: { message: any; error: any; }) => {
            Swal.fire(
              "Failed to delete course kit",
              error.message || error.error,
              "error"
            );
          }
        );
      }
    });
  }

  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;

  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row: CourseModel) =>
          this.selection.select(row)
        );
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this user!',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed){
        this.selection.selected.forEach((item) => {
          const index: number = this.dataSource.findIndex(
            (d: CourseModel) => d === item
          );
          // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
          this.courseService?.dataChange.value.splice(index, 1);
          this.refreshTable();
          this.selection = new SelectionModel<CourseModel>(true, []);
        });
        Swal.fire({
          title: 'Success',
          text: 'Record Deleted Successfully...!!!',
          icon: 'success',
          // confirmButtonColor: '#526D82',
        });
      }
    });


  }
  //serach functionality
  performSearch() {
    if(this.searchTerm){
    this.dataSource = this.dataSource?.filter((item: any) =>{
      const search = (item.name + item.shortDescription + item.longDescription).toLowerCase()
      return search.indexOf(this.searchTerm.toLowerCase())!== -1;

    }
    );
    } else {
       this.fetchCourseKits();

    }
  }
  // export table data in excel file
  exportExcel() {
    //k//ey name with space add in brackets
   const exportData: Partial<TableElement>[] = this.dataSource.map(
     (user: any) => ({
       'Course Name': user.name,
       'Short Description': user.shortDescription,
       'Long Description': user.longDescription,
       'Document Link': user.documentLink,
     })
   );
    TableExportUtil.exportToExcel(exportData, 'excel');
  }

  generatePdf() {
    const doc = new jsPDF();
    const headers = [['Course Name','Short Description','Long Description','Document Link']];
    console.log(this.dataSource)
    const data = this.dataSource.map((user:any) =>
      [user.name,
        user.shortDescription,
       user.longDescription,
       user.documentLink
    ] );
    //const columnWidths = [60, 80, 40];
    const columnWidths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

    // Add a page to the document (optional)
    //doc.addPage();

    // Generate the table using jspdf-autotable
    (doc as any).autoTable({
      head: headers,
      body: data,
      startY: 20,



    });

    // Save or open the PDF
    doc.save('CourseKit-list.pdf');
  }

}
