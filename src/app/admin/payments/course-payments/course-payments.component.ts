import { query } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {CourseKitModel, CourseModel, CoursePaginationModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import { TableElement, TableExportUtil } from '@shared';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-course-payments',
  templateUrl: './course-payments.component.html',
  styleUrls: ['./course-payments.component.scss']
})
export class CoursePaymentsComponent {
  displayedColumns: string[] = [
    'select',
    'Course Name',
    'Payment Date',
    'Amount',
    'Student Name',
    'Payment Status',
    'status',
  ];
  
  breadscrums = [
    {
      // title: 'Programs',
      items: ['Payments'],
      active: 'Course Payments',
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
    public utils: UtilsService, private courseService: CourseService,
    private snackBar: MatSnackBar,
  ) {
    
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  
  ngOnInit(): void {
   this.getAllCourse();
  }
  getAllCourse(){
    this.courseService.getAllPayments({ ...this.coursePaginationModel}).subscribe(response =>{
      console.log("res",response)
     this.dataSource = response.data.docs;
     this.totalItems = response.data.totalDocs;
    })
  }
  pageSizeChange($event: any) {
    this.courseKitModel.page = $event?.pageIndex + 1;
    this.courseKitModel.limit = $event?.pageSize;
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
console.log("id", id)
this.router.navigate(['/admin/payment/view-payments/'], {queryParams:{id:id}})
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
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
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
    // this.showNotification(
    //   'snackbar-danger',
    //   totalSelect + ' Record Delete Successfully...!!!',
    //   'top',
    //   'right'
    // );
  }
   //search functinality
   performSearch() {
    console.log(this.dataSource)
    console.log(this.searchTerm)
    if(this.searchTerm){
    this.dataSource = this.dataSource?.filter((item: any) =>{   
      console.log("vv", item)
      const search = (item.course + item.name).toLowerCase()
      return search.indexOf(this.searchTerm.toLowerCase())!== -1;
      
    }
    );
    } else {
       this.getAllCourse();

    }
  }
  exportExcel() {
    //k//ey name with space add in brackets
   const exportData: Partial<TableElement>[] =
      this.dataSource.map((user:any) => ({
        CourseName:user.course,
        PaymentDate: formatDate(new Date(user.createdAt), 'yyyy-MM-dd', 'en') || '',
        Amount: user.price,
        StudentName: user.name,
        Status: user.status
      }));
    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  // pdf
  generatePdf() {
    const doc = new jsPDF();
    const headers = [['Course Name','Payment Date','Amount', 'Student Name', 'Status']];
    console.log(this.dataSource)
    const data = this.dataSource.map((user:any) =>
      [user.course,
      formatDate(new Date(user.createdAt), 'yyyy-MM-dd', 'en') || '',
       user.price,
       user.name,
       user.status

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

}
