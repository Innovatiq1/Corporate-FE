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
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent {

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
      items: ['Users'],
      active: 'All User',
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

  constructor(private router: Router,
    public utils: UtilsService,
    private alluserService: UserService,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private courseService: CourseService,
    private snackBar: MatSnackBar

  ) {

    this.coursePaginationModel = {};
}

@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
@ViewChild('filter', { static: true }) filter!: ElementRef;

getBlogsList(filters?:any) {
  this.alluserService.getUserList({...this.coursePaginationModel}).subscribe((response: any) => {
    this.dataSource = response.data.data;
    this.isLoading = false;
    this.ref.detectChanges();
    this.totalItems = response.totalRecords
    this.coursePaginationModel.docs = response.docs;
    this.coursePaginationModel.page = response.page;
    this.coursePaginationModel.limit = response.limit;

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
performSearch() {
  if(this.searchTerm){
  this.dataSource = this.dataSource?.filter((item: any) =>{
    const searchList = (item.type + item.qualification + item.name).toLowerCase()
    return searchList.indexOf(this.searchTerm.toLowerCase()) !== -1
  }


  // item.classId.courseId?.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  } else {
    this.getBlogsList();

  }
}
edit(row:any){
  console.log("row: " + row.id);
this.router.navigate(['/admin/users/edit-all-users'], {queryParams:{row:row}})
}
exportExcel() {
  //k//ey name with space add in brackets
 const exportData: Partial<TableElement>[] = this.dataSource.map(
   (user: any) => ({
     'Name': user.name,
     'User Type': user.type,
     'Qualification': user.qualification,
     'Email': user.email,
     'Status' : user.Active ?  'Active': 'Inactive' 
   })
 );
  TableExportUtil.exportToExcel(exportData, 'excel');
}

generatePdf() {
  const doc = new jsPDF();
  const headers = [['Name','User Type','Qualification','Email','Status']];
  console.log(this.dataSource)
  const data = this.dataSource.map((user:any) =>
    [user.name,
      user.type,
     user.qualification,
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



  });

  // Save or open the PDF
  doc.save('AllUsers-list.pdf');
}
}
