import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { ProgramCourse } from '../program.model';
import { CoursePaginationModel } from '@core/models/course.model';
import Swal from 'sweetalert2';
import { TableElement, TableExportUtil } from '@shared';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
      active: 'All Program',
    },
  ];
  isLoading = false;
  isNoMoreData = false;
  programData: any = [];
  programCourse!: ProgramCourse;
  // Mode = Mode;
  pageSizeArr = this.utils.pageSizeArr;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;

  constructor(
  
    private utils: UtilsService,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private courseService: CourseService,
    private classService: ClassService
  ) { this.coursePaginationModel = {};
 }

  getProgramList(filters?: any) {
    this.isLoading = true;
    this.isNoMoreData = false;
    this.courseService.getCourseProgram({...this.coursePaginationModel,status:'active'}).subscribe(
      (response: any) => {
        console.log("page",response)
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
      this.courseService.deleteProgram(id).subscribe(() => {
        this.getProgramList();
        Swal.fire({
          title: 'Success',
          text: 'Program deleted successfully.',
          icon: 'success',
        });
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
  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    console.log("vv", this.programData);
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
    console.log(this.programData)
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
}
