import { ChangeDetectorRef, Component, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { ProgramCourse } from '../program.model';
import { CoursePaginationModel } from '@core/models/course.model';
import Swal from 'sweetalert2';
import { TableElement, TableExportUtil } from '@shared';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { sort } from 'd3';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FilterPopupComponent } from './filter-popup/filter-popup.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UserService } from '@core/service/user.service';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {
  breadscrums = [
    {
      title: 'Program List',
      items: ['Program'],
      active: 'Program List',
    },
  ];
  displayedColumns = [
    'program',
    'status',
    'code',
    'Creator',
    'Duration',
    'Start Date',
    'End Date',
    'Payment',
    'Compulsory Count',
    'Elective Count',
    
  ];
  isLoading = false;
  isNoMoreData = false;
  programData: any = [];
  programCourse!: ProgramCourse;
  // Mode = Mode;
  pageSizeArr = this.utils.pageSizeArr;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  // filterName='';
  searchTerm: string = '';
  selection = new SelectionModel<ProgramCourse>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  subscribeParams: any;
  path: any;
  isProgram = false;
  isCreator = false;
  isFilter = false;
  // programData: any;
  titles: string[] = []; 
  codes: string[] = []; 
  creator: string[] = [];
  duration: string[] = [];
  startDate: string[] = [];
  endDate: string[] = [];
  status: string[] = [];
  programList: any;
  selectedPrograms: any = [];
  limit: any = 10
  isFiltered = false;
  vendors: any;
  selectedVendors: any = [];
  selectedStatus: any = [];
  users: any;
  selectedCreators: any = [];
  filterForm!: FormGroup

row: any;
  programsData: any;

  constructor(
  
    private utils: UtilsService,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private courseService: CourseService,
    private classService: ClassService,
    private route :Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService
  ) { this.coursePaginationModel = {};
  let urlPath = this.route.url.split('/')
  // this.editUrl = urlPath.includes('edit-program');
  this.path = urlPath[urlPath.length - 1];
  
  this.filterForm = this.fb.group({
    program: ['', []],
    creator: ['', []],
    // startDate: ['', []],
    // endDate: ['', []],
    status: ['', []],
    vendor: ['', []]

  })

  if (this.path == 'program'){
    this.isProgram = true;
    this.displayedColumns = [
      'program',
      'status',
      'code',
      'Creator',
      'Duration',
      'Start Date',
      'End Date',
      'Payment',
      'Compulsory Count',
      'Elective Count',
      
    ];

    this.breadscrums = [
      {
        title: 'Program Name',
        items: ['Program List'],
        active: 'Program Name',
      },
    ];
  }
  if (this.path == 'creator'){
    this.isCreator = true;
    this.displayedColumns = [
      'Creator',
      'status',
      'program',
      'code',
      'Duration',
      'Start Date',
      'End Date',
      'Payment',
      'Compulsory Count',
      'Elective Count',
      
    ];
    this.breadscrums = [
      {
        title: 'Creator',
        items: ['Program List'],
        active: 'Creator',
      },
    ];
  }
 }
 openFilterCard(){
this.isFilter = !this.isFilter;
 }

 openFilterPopup(event:MouseEvent,data:any): void {
  const dialogRef = this.dialog.open(FilterPopupComponent, {
    hasBackdrop: true,
    backdropClass: 'filter-popup-backdrop',
    position: { top: `65px`, left: `650px` },
    width: '600px',
    maxHeight: '90vh',
  });
}

onSelectionChange(event: any, field: any) {
  if (field == 'program') {
    this.selectedPrograms = event.value;
  }
  if (field == 'vendor') {
    // this.selectedVendors = event.value;
  }
  if (field == 'status') {
    this.selectedStatus = event.value;
  }
  if (field == 'creator') {
    this.selectedCreators = event.value;
  }
  if (field == 'startDate') {
    this.selectedCreators = event.value;
  }



}
clearFilter() {
  this.filterForm.reset()
  this.getProgramList()
}
applyFilter() {
  let body: any = {};
  if (this.selectedPrograms.length > 0) {
    body.title = this.selectedPrograms
  }
  if (this.selectedVendors.length > 0) {
    body.vendor = this.selectedVendors
  }
  if (this.selectedStatus.length > 0) {
    body.status = this.selectedStatus
  }
  if (this.selectedCreators.length > 0) {
    body.creator = this.selectedCreators
  }

  this.courseService.getFilteredProgramData(body, { ...this.coursePaginationModel }).subscribe(response => {
    this.programData = response.data.docs;
    this.totalItems = response.data.totalDocs
    this.isFiltered = true;
    this.coursePaginationModel.docs = response.data.docs;
    this.coursePaginationModel.page = response.data.page;
    this.coursePaginationModel.limit = response.data.limit;
    this.coursePaginationModel.totalDocs = response.data.totalDocs;

  })

}

getFilterData(filters?: any) {
  // let filterText = this.filterName
  this.courseService.getAllPrograms().subscribe(
    (response: any) => {
      this.programData = response.docs;
      console.log(this.programData);
      this.titles = this.programData.map((doc: any) => doc.title);
      this.codes = this.programData.map((doc: any) => doc.courseCode);
      this.creator = this.programData.map((doc: any) => doc.creator);
      this.duration = this.programData.map((doc: any) => doc.duration);
      this.startDate = this.programData.map((doc: any) => doc.sessionStartDate);
      this.endDate = this.programData.map((doc: any) => doc.sessionEndDate);
      this.status = this.programData.map((doc: any) => doc.status);
    },
    (error) => {
    }
  );
}

  getProgramList(filters?: any) {
    this.isLoading = true;
    this.isNoMoreData = false;
    // let filterText = this.filterName
    this.courseService.getAllPrograms({...this.coursePaginationModel}).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.programData = response.docs;
        this.totalItems = response.totalDocs;
        this.coursePaginationModel.docs = response.docs;
        this.coursePaginationModel.page = response.page;
        this.coursePaginationModel.limit = response.limit;
        this.coursePaginationModel.totalDocs = response.totalDocs;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }
  delete(id: string) {
    this.classService.getProgramClassList({ courseId: id }).subscribe((classList: any) => {
      const matchingClasses = classList.docs.filter((classItem: any) => {
        return classItem.courseId && classItem.courseId.id === id;
      });
      if (matchingClasses.length > 0) {
        Swal.fire({
          title: 'Error',
          text: 'Classes have been registered with this program. Cannot delete.',
          icon: 'error',
        });
        return;
      }

      Swal.fire({
        title: "Confirm Deletion",
        text: "Are you sure you want to delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed){
          this.courseService.deleteProgram(id).subscribe(() => {
            this.getProgramList();
            Swal.fire({
              title: 'Success',
              text: 'Program deleted successfully.',
              icon: 'success',
            });
          });
        }
      });
      
    });
  }
  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    if (this.isFiltered) {
      this.applyFilter()
    } else {
      this.getProgramList();
    }
  }

  ngOnInit(): void {
    this.getProgramList();
    this.getFilterData();
    this.getAllVendorsAndUsers();
    forkJoin({
      courses: this.courseService.getAllProgramsWithoutPagination({ ...this.coursePaginationModel}),
    }).subscribe((response) => {
      this.programList = response.courses;
    });

  }

  getAllVendorsAndUsers() {
    this.courseService.getVendor().subscribe((response: any) => {
      this.vendors = response.reverse();
    })
    this.userService.getAllUsers().subscribe((response: any) => {
      this.users = response?.results;
    });

  }


performSearch() {
  if(this.searchTerm){
  this.programData = this.programData?.filter((item: any) =>{
    const searchList = (item.title).toLowerCase();
    return searchList.indexOf(this.searchTerm.toLowerCase()) !== -1
  }
  );
  } else {
    this.getProgramList();

  }
}

viewActiveProgram(id:string, status: string):void {
  this.route.navigate(['/admin/program/view-program'],{queryParams:{id:id, status: status}});
}
  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.programData.map((x: any) => ({
        'Program Name': x.title,
        'Duration': x.duration,
        'Compulsory Count' : x.coreCourseCount,
        'Elective Count': x.electiveCourseCount
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  generatePdf() {
    const doc = new jsPDF();
    const headers = [[' Program Name','Duration', 'Compulsory Count', 'Elective Count']];
    const data = this.programData.map((x:any) =>
      [x.title,
        x.duration,
        x.coreCourseCount,
        x.electiveCourseCount
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
    doc.save('AllPrograms-list.pdf');
  }
  refresh() {
    //this.loadData();
    window.location.reload();

    //this.location.re
  }
  addNew() {
    this.route.navigateByUrl("/admin/program/create-program")


  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.programData.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.programData.renderedData.forEach((row: ProgramCourse) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;

    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed){
        this.selection.selected.forEach((item) => {
          const index: number = this.programData.renderedData.findIndex(
            (d: ProgramCourse) => d === item
          );
          
          // this.exampleDatabase?.dataChange.value.splice(index, 1);
          this.refreshTable();
          this.selection = new SelectionModel<ProgramCourse>(true, []);
        });
        Swal.fire({
          title: 'Success',
          text: 'Record Deleted Successfully...!!!',
          icon: 'success',
          // confirmButtonColor: '#526D82',
        });
      }
    });
   
    // this.showNotification(
    //   'snackbar-danger',
    //   totalSelect + ' Record Delete Successfully...!!!',
    //   'bottom',
    //   'center'
    // );
  }
}
