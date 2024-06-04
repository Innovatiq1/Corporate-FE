import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel, CoursePaginationModel } from '@core/models/course.model';
import { Users } from '@core/models/user.model';
import { CourseService } from '@core/service/course.service';
import { UserService } from '@core/service/user.service';
import { UtilsService } from '@core/service/utils.service';
import { TableElement, TableExportUtil } from '@shared';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { RoleDailogComponent } from '../all-users/role-dailog/role-dailog.component';
import { Direction } from '@angular/cdk/bidi';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent {
  displayedColumns: string[] = [
    // 'select',
    'img',
    'Name',
    'User Type',
    'gender',
    'Qualification',
    'Mobile',
    'Email',
    'Status',
    // 'Actions'
  ];
  breadscrums = [
    {
      title: 'All User',
      items: ['User Profile'],
      active: 'Staff',
    },
  ];
  create = true;
  status = true;
  dataSource: any;
  response: any;
  isLoading = true;
  selection = new SelectionModel<CourseModel>(true, []);
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  searchTerm:string = '';
  pageSizeArr = this.utils.pageSizeArr;
  typeName?: any;
  headId: any;

  constructor(private router: Router,
    public utils: UtilsService,
    private alluserService: UserService,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {

    this.coursePaginationModel = {};

    let urlPath = this.router.url.split('/');
    // this.editUrl = urlPath.includes('edit-program');
    this.headId = urlPath[urlPath.length - 1];
}

@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
@ViewChild('filter', { static: true }) filter!: ElementRef;

getBlogsList(filters?:any) {
  let filterText = this.searchTerm;
  // let headId = localStorage.getItem('id');
  this.alluserService.getUsersById( {filterText,...this.coursePaginationModel, headId: this.headId}).subscribe((response: any) => {
    this.dataSource = response.data.docs;
    this.isLoading = false;
    this.ref.detectChanges();
    this.totalItems = response.data.totalDocs
    this.coursePaginationModel.docs = response.data.docs;
    this.coursePaginationModel.page = response.data.page;
    this.coursePaginationModel.limit = response.data.limit;

  }, error => {
  });
}

ngOnInit(): void {
  this.activatedRoute.queryParams.subscribe((params: any) => {
    this.getBlogsList(params);
  });
  

}

pageSizeChange($event: any) {
  this.coursePaginationModel.page = $event?.pageIndex + 1;
  this.coursePaginationModel.limit = $event?.pageSize;
  this.getBlogsList()

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
    title: "Confirm Deletion",
    text: "Are you sure you want to delete selected records?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
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
performSearch() {
this.getBlogsList()
}
edit(row:any){
this.router.navigate(['/admin/users/edit-all-users'], {queryParams:{row:row}})
}
addNew(type: any) {
  let tempDirection: Direction;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogRef = this.dialog.open(RoleDailogComponent, {
    data: {
      typeName: type,
    },
    direction: tempDirection,
   
  });
}
exportExcel() {
  //k//ey name with space add in brackets
 const exportData: Partial<TableElement>[] = this.dataSource.map(
   (user: any) => ({
     'Name': user.name,
     'Role': user.type,
     'Gender':  user.gender,
     'Qualification': user.qualification,
     'Mobile': user.mobile,
     'Email': user.email,
     'Status' : user.Active ?  'Active': 'Inactive' 
   })
 );
  TableExportUtil.exportToExcel(exportData, 'AllUsers-list');
}

generatePdf() {
  const doc = new jsPDF();
  const headers = [['Name       ','Role       ','Gender','Qualification','Mobile','Email','Status']];
  const data = this.dataSource.map((user:any) =>
    [user.name,
      user.type,
      user.gender,
     user.qualification,
     user.mobile,
     user.email,
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
    headStyles: {
      fontSize: 10,
      cellWidth: 'wrap',
    },


  });

  // Save or open the PDF
  doc.save('AllUsers-list.pdf');
}

}
