import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { ReviewService } from '@core/service/review.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';
import { TableElement, TableExportUtil } from '@shared';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  displayedColumns: string[] = [
    'select',
    'Name',
    'Qualification',
    'Review',
    'Country',
    'Status',
    'Actions'
  ];
  breadscrums = [
    {
      title: 'Audit',
      items: ['Testimonials'],
      active: 'Student',
    },
  ];
  pageSizeArr = this.utils.pageSizeArr;
  totalItems: any;
  create = true;
  status = true;
  collegeReviewList: any;
  isLoading = true;
  dataSource: any;
  selection = new SelectionModel<CourseModel>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router, public utils: UtilsService,private cd:ChangeDetectorRef,
    private reviewService:ReviewService,private activatedRoute: ActivatedRoute,private courseService: CourseService,
    private snackBar: MatSnackBar)  {
      this.activatedRoute.queryParams.subscribe(params => {
        this.getReviewList(params);
      });
      }

  toggleStatus(){
    this.status = !this.status;
  }
  toggle(){
    this.router.navigate(['/admin/testimonials/edit-student']);
  }
  edit(id:any){
    this.router.navigate(['/admin/testimonials/edit-student/' + id]);
  }
  
  upload() {
    document.getElementById('input')?.click();
  }
  activationTestimonial(listid:any,status:any)
  {
      var mylist = {id:listid,status:status};
      this.reviewService.updateReviewTestimonialStatus(mylist).subscribe(
        (response) => {
          Swal.fire({
            title: 'Successful',
            text: response.message,
            icon: 'success',
          });
          this.activatedRoute.queryParams.subscribe(params => {
            this.getReviewList(params);
          });
        },
        (err) => {
          Swal.fire( 
            'Add file faild',
            'error'
          );
        },
      );
  }


  getReviewList(filter?:any) {
    this.isLoading = true;
    this.reviewService.getReviewList(filter).subscribe( response =>{
      this.isLoading = false;
      this.dataSource = response.data.data;
      let limit = filter.limit ? filter.limit : 10
      if (response.totalRecords <= limit || response.totalRecords <= 0) {
        this.isLoading = false;
      }
      this.cd.detectChanges();
    }, error => {
      this.isLoading = false;

    });
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
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.findIndex(
        (d: CourseModel) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.courseService?.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<CourseModel>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'top',
      'right'
    );
  }
  
  exportExcel() {
    //k//ey name with space add in brackets
   const exportData: Partial<TableElement>[] = this.dataSource.map(
     (user: any) => ({
       'Name': user.name,
       'Qualification': user.qualification,
       'Review': user.text,
       'Country': user.country,
       'Status': user.Active ?  'Active': 'Inactive',
     })
   );
    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  
  generatePdf() {
    const doc = new jsPDF();
    const headers = [['Name','Qualification','Review','Country','Status']];
    console.log(this.dataSource)
    const data = this.dataSource.map((user:any) =>
      [user.name,
        user.qualification,
       user.text,
       user.country,
       user.Active ? 'Active': 'Inactive'
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
    doc.save('Student-review-list.pdf');
  }
}
