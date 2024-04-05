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

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {
  breadscrums = [
    {
      title: 'All Program',
      items: ['Program'],
      active: 'All Programs',
    },
  ];
  displayedColumns = [
    'name',
    'code',
    'Creator',
    'Duration',
    'Start Date',
    'End Date',
    'Payment',
    'Compulsory Count',
    'Elective Count',
    'status'
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

  constructor(
  
    private utils: UtilsService,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private courseService: CourseService,
    private classService: ClassService,
    private route :Router,
    private dialog: MatDialog
  ) { this.coursePaginationModel = {};

  // @ViewChild('filter', { static: true }) filter!: ElementRef;
 }

  getProgramList(filters?: any) {
    this.isLoading = true;
    this.isNoMoreData = false;
    // let filterText = this.filterName
    this.courseService.getCourseProgram({...this.coursePaginationModel,status:'active'}).subscribe(
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
    this.getProgramList()
  }
  ngOnInit(): void {
    this.getProgramList();
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

viewActiveProgram(id:string):void {
  this.route.navigate(['/admin/program/view-program'],{queryParams:{id:id, status:'active'}});
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
          // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
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
