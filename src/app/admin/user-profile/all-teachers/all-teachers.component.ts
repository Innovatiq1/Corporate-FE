import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
//import { MatMenuTrigger } from '@angular/material/menu';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { formatDate } from '@angular/common';
import { UsersModel } from '@core/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
//import 'jspdf-autotable';
import 'jspdf-autotable';
import { Location } from '@angular/common';
import { UtilsService } from '@core/service/utils.service';
import { Teachers } from 'app/admin/teachers/teachers.model';
import { TeachersService } from 'app/admin/teachers/teachers.service';
import { UserService } from '@core/service/user.service';
import { CourseService } from '@core/service/course.service';
import { CourseModel } from '@core/models/course.model';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.scss'],
})
export class AllTeachersComponent implements OnInit {
  displayedColumns = [
    // 'select',
    'img',
    'name',
    'department',
    'gender',
    'degree',
    'mobile',
    'email',
    'Status',
    // 'date',
    // 'actions',
  ];
  // exampleDatabase?: TeachersService;
  dataSource!: any;
  selection = new SelectionModel<CourseModel>(true, []);
  id?: number;
  teachers?: Teachers;
  UsersModel!: Partial<UsersModel>;
  isLoading = true;

  breadscrums = [
    {
      title: 'Instructors',
      items: ['User Profile'],
      active: 'Managers',
    },
  ];
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  // rowData:any
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public teachersService: TeachersService,
    private snackBar: MatSnackBar,
    private route: Router,
    private location: Location,
    public utils: UtilsService,
    private alluserService: UserService,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) {
    this.UsersModel = {};
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  searchTerm: string = '';

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.getBlogsList(params);
    });
  }
  refresh() {
    //this.loadData();
    window.location.reload();

    //this.location.re
  }
  addNew() {
    this.route.navigateByUrl('/admin/user-profile/add-instructor');
  }
  aboutInstructor(id: any) {
    this.route.navigate(['/admin/user-profile/view-instructor'], {
      queryParams: { data: id },
    });
  }
  getBlogsList(filters?: any) {
    let filterText = this.searchTerm;
    let headId = localStorage.getItem('id');
    this.alluserService
      .getUsersById({ filterText, ...this.UsersModel, headId })
      .subscribe(
        (response: any) => {
          this.dataSource = response.data.docs;
          this.isLoading = false;
          this.totalItems = response.data.totalDocs;
          this.UsersModel.docs = response.data.docs;
          this.UsersModel.page = response.data.page;
          this.UsersModel.limit = response.data.limit;
        },
        (error) => {}
      );
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row: CourseModel) =>
          this.selection.select(row)
        );
  }

  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;

    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete selected records?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.selection.selected.forEach((item) => {
          const index: number = this.dataSource.findIndex(
            (d: CourseModel) => d === item
          );

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

  pageSizeChange($event: any) {
    this.UsersModel.page = $event?.pageIndex + 1;
    this.UsersModel.limit = $event?.pageSize;
    this.getBlogsList();
  }

  exportExcel() {
    //k//ey name with space add in brackets
    const exportData: Partial<TableElement>[] = this.dataSource.map(
      (x: any) => ({
        Name: x.name,
        Department: x.department,
        Gender: x.gender,
        Degree: x.qualification,
        Mobile: x.mobile,
        Email: x.email,
        Status: x.Active ? 'Active' : 'Inactive',
      })
    );

    TableExportUtil.exportToExcel(exportData, 'Manager-list');
  }
  generatePdf() {
    const doc = new jsPDF();
    const headers = [
      [
        'Name',
        'Department',
        'Gender',
        'Education',
        'Mobile',
        'Email',
        'Status',
      ],
    ];
    const data = this.dataSource.map((user: any) => [
      user.name,
      user.department,
      user.gender,
      user.qualification,
      user.mobile,
      user.email,
      user.Active ? 'Active' : 'Inactive',
      ,
    ]);
    //const columnWidths = [60, 80, 40];
    const columnWidths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

    (doc as any).autoTable({
      head: headers,
      body: data,
      startY: 20,
      headStyles: {
        fontSize: 10,
        cellWidth: 'wrap',
      },
    });

    doc.save('Manager-list.pdf');
  }
performSearch() {
this.getBlogsList()
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
  // context menu
  onContextMenu(event: MouseEvent, item: Teachers) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}
