import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {CourseKitModel, CourseModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
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
  dataSource1 = [
    { name: 'Ship Safety Officer', date: 'Nov 9', amount: '2500', sname: 'Gung Tui', status: 'Done' },
    { name: 'Cargo Operations', date: 'Nov 10', amount: '2000', sname: 'Chung Lee', status: 'Done' },
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

  constructor(private router: Router, private formBuilder: FormBuilder,
    public utils: UtilsService, private courseService: CourseService,
    private snackBar: MatSnackBar,
  ) {
   
    
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  
  ngOnInit(): void {
   
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

}
