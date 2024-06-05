// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-certificate-template',
//   templateUrl: './certificate-template.component.html',
//   styleUrls: ['./certificate-template.component.scss']
// })
// export class CertificateTemplateComponent {
//   breadscrums = [
//     {
//       title: 'Certificate',
//       items: ['Customize'],
//       active: 'Certificate',
//     },
//   ];
// }
import { query } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {CourseKitModel, CourseModel, CoursePaginationModel } from '@core/models/course.model';
//import { CourseService } from '@core/service/course.service';
import { CertificateService } from 'app/core/service/certificate.service';
import { UtilsService } from '@core/service/utils.service';
import { TableElement, TableExportUtil } from '@shared';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificate-template',
  templateUrl: './certificate-template.component.html',
  styleUrls: ['./certificate-template.component.scss']
})
export class CertificateTemplateComponent {
  displayedColumns: string[] = [
    // 'select',
    'Title',
   // 'email',
    //'Course Name',
    //'Payment Mode',
    'Creation Date',
    //'Amount',
    //'Payment Status',
    // 'status',
  ];
  
    breadscrums = [
    {
      title: 'Certificate',
      items: ['Customize'],
      active: 'Certificate',
    },
  ];
  courseKitModel!: Partial<CourseKitModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  selection = new SelectionModel<CourseModel>(true, []);
  dataSource: any;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  searchTerm: string = '';
 

  constructor(private router: Router, private formBuilder: FormBuilder,
    public utils: UtilsService, private courseService: CertificateService,
    private snackBar: MatSnackBar,private ref: ChangeDetectorRef,
  ) {
    this.coursePaginationModel = {};
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  
  ngOnInit(): void {
   //this.getAllCourse();
   this.getAllCertificates();
  }
  // getAllCourse(){
  //   this.courseService.getAllPayments({ ...this.coursePaginationModel}).subscribe(response =>{
  //    this.dataSource = response.data.docs;
  //    this.ref.detectChanges();
  //    this.totalItems = response.data.totalDocs;
  //    this.coursePaginationModel.docs = response.docs;
  //   this.coursePaginationModel.page = response.page;
  //   this.coursePaginationModel.limit = response.limit;
  //   }, error => {
  //   });
  // }


  getAllCertificates(){
    this.courseService.getAllCertificate({ ...this.coursePaginationModel}).subscribe(response =>{
     this.dataSource = response.data.docs;
     this.ref.detectChanges();
     this.totalItems = response.data.totalDocs;
     this.coursePaginationModel.docs = response.docs;
    this.coursePaginationModel.page = response.page;
    this.coursePaginationModel.limit = response.limit;
    }, error => {
    });
  }
  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    //this.getAllCourse();
    this.getAllCertificates();
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

view(id:any){

this.router.navigate(['/student/settings/certificate/edit/:id'], {queryParams:{id:id}})
// [routerLink]="['/admin/payment/view-payments/']"
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
  // removeSelectedRows() {
  //   const totalSelect = this.selection.selected.length;


  //   Swal.fire({
  //     title: "Confirm Deletion",
  //     text: "Are you sure you want to delete?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Delete",
  //     cancelButtonText: "Cancel",
  //   }).then((result) => {
  //     if (result.isConfirmed){
  //       this.selection.selected.forEach((item) => {
  //         const index: number = this.dataSource.findIndex(
  //           (d: CourseModel) => d === item
  //         );
          
  //         this.courseService?.dataChange.value.splice(index, 1);
  //         this.refreshTable();
  //         this.selection = new SelectionModel<CourseModel>(true, []);
  //       });
  //       Swal.fire({
  //         title: 'Success',
  //         text: 'Record Deleted Successfully...!!!',
  //         icon: 'success',
  //         // confirmButtonColor: '#526D82',
  //       });
  //     }
  //   });
   
  //   // this.showNotification(
  //   //   'snackbar-danger',
  //   //   totalSelect + ' Record Delete Successfully...!!!',
  //   //   'top',
  //   //   'right'
  //   // );
  // }
   //search functinality
   performSearch() {
    
    
    if(this.searchTerm){
    this.dataSource = this.dataSource?.filter((item: any) =>{   
      const search = (item.course + item.name).toLowerCase()
      return search.indexOf(this.searchTerm.toLowerCase())!== -1;
      
    }
    );
    } else {
      // this.getAllCourse();
       this.getAllCertificates();

    }
  }
  exportExcel() {
    //k//ey name with space add in brackets
   const exportData: Partial<TableElement>[] =
      this.dataSource.map((user:any) => ({
        Title:user.title,
        CreationDate: formatDate(new Date(user.createdAt), 'yyyy-MM-dd', 'en') || '',
      }));
    TableExportUtil.exportToExcel(exportData, 'Course Payments');
  }
  // pdf
  generatePdf() {
    const doc = new jsPDF();
    const headers = [['Title','Creation Date']];
    
    const data = this.dataSource.map((user:any) =>
      [user.title,
       formatDate(new Date(user.createdAt), 'yyyy-MM-dd', 'en') || '',
       

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
    doc.save('Course Payments.pdf');
  }
  getStatusClass(status: string): string {
    return status === 'Success' ? 'success' : 'fail';
  }
}
