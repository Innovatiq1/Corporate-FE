import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, NavigationStart } from '@angular/router';
import { CourseKitModel, CourseModel, CoursePaginationModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { TableElement, TableExportUtil } from '@shared';
import { EtmsDashboardComponent } from '../etms-dashboard/etms-dashboard.component';
import { EtmsService } from '@core/service/etms.service';

@Component({
  selector: 'app-dept-budget-allocation',
  templateUrl: './dept-budget-allocation.component.html',
  styleUrls: ['./dept-budget-allocation.component.scss']
})
export class DeptBudgetAllocationComponent implements OnInit{
  displayedColumns: string[] = [
    'select',
    'Department Name',
    'Percentage Allocated',
    'By Value',
    'Budget Allocated',
    'Approval',
    'Details'
  ];

  breadscrums = [
    {
      title: 'Over All Budget',
      // items: ['Extra'],
      active: 'Department Budget Allocation',
    },
  ];
  courseKitModel!: Partial<CourseKitModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  selection = new SelectionModel<CourseModel>(true, []);
  dataSource: any;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  searchTerm: string = '';
  department?: CourseModel;
  id?: string;
 
  

 
  constructor(private router: Router, private formBuilder: FormBuilder,
    public utils: UtilsService, private courseService: CourseService,
    private snackBar: MatSnackBar,private ref: ChangeDetectorRef,
    private etmsService:EtmsService
  ) {
    this.coursePaginationModel = {};
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart event:', event);
      }
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  
  ngOnInit(): void {
   this.getAllDepartmentBudgets();
  }
  // edit(row: CourseModel) {
  //   this.id = row.id;
  //   this.router.navigate(['/admin/e-tms/edit-department-budget/' + this.id])

  // }
  edit(id: any) {
    this.router.navigate(['/admin/e-tms/edit-department-budget'], {
      queryParams: { id: id, action: 'edit' },
    });
  }

  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.getAllDepartmentBudgets()
  }
  getAllDepartmentBudgets(){
    this.etmsService.getAllDepartmentBudgets({...this.coursePaginationModel}).subscribe((res) => {
      this.dataSource = res.docs;
      this.totalItems = res.totalDocs;
      this.coursePaginationModel.docs = res.docs;
      this.coursePaginationModel.page = res.page;
      this.coursePaginationModel.limit = res.limit;
    })
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
    Swal.fire({
      title: 'Success',
      text: 'Training Deleted Successfully...!!!',
      icon: 'success',
    });
  }
  approveCourse(): void {
    Swal.fire({
      title: 'Success',
      text: 'Training approved successfully.',
      icon: 'success',
    });
  }
  isAnyRowSelected(): boolean {
    return this.selection.hasValue();
  }

  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.map((x: any) => ({
        'Department Name': x.department,
        'Percentage Allocated': x.percentage,
        'By Value': x.value,
        'Budget Allocated': x.value,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  generatePdf() {
    const doc = new jsPDF();
    const headers = [[' Department Name','Percentage Allocated', 'By Value', 'Budget Allocated']];
    console.log(this.dataSource)
    const data = this.dataSource.map((x:any) =>
      [x.department,
        x.percentage,
        x.value,
        x.value
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
    doc.save('Department-budget-allocation-list.pdf');
  }

}
