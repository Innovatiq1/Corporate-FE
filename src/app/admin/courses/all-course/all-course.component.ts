/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ViewChild } from '@angular/core';
import { CourseService } from '@core/service/course.service';
import { CoursePaginationModel, MainCategory, SubCategory } from '@core/models/course.model';
import Swal from 'sweetalert2';
import { ClassService } from 'app/admin/schedule-class/class.service';
import { TableElement, TableExportUtil } from '@shared';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.scss'],
})
export class AllCourseComponent {
  breadscrums = [
    {
      title: 'Course List',
      items: ['Course'],
      active: 'Course List',
    },
  ];
  displayedColumns = [
    'name',
    'code',
    'creator',
    'Days',
    'Training Hours',
    'Fees',
    'startDate',
      'endDate',
    'Vendor',
    'status'
  ];
  // displayedColumns = [
  //   'name',
  //   'code',
  //   'Days',
  //   'Training Hours',
  //   'Fees',
  //   'Vendor',
  //   'status'
  // ];
  coursePaginationModel: Partial<CoursePaginationModel>;
  courseData: any;
  pagination :any;
  totalItems: any;
  pageSizeArr = [10, 25, 50, 100];
  mainCategories!: MainCategory[];
  subCategories!: SubCategory[];
  allSubCategories!: SubCategory[];
  dataSource: any;
  searchTerm: string = '';
  path: any;
  isCourse = false;
  isCreator = false;
  selection = new SelectionModel<MainCategory>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  isFilter = false;
  // programData: any;
  titles: string[] = []; 
  codes: string[] = []; 
  creator: string[] = [];
  duration: string[] = [];
  startDate: string[] = [];
  endDate: string[] = [];
  status: string[] = [];
  
  constructor(public _courseService:CourseService, private route :Router, private classService: ClassService) {
    // constructor
    this.coursePaginationModel = {};
    let urlPath = this.route.url.split('/')
    // this.editUrl = urlPath.includes('edit-program');
    this.path = urlPath[urlPath.length - 1];
    if (this.path == 'course'){
      this.isCourse = true;
      this.displayedColumns = [
        'name',
      'code',
      'creator',
      'Days',
      'Training Hours',
      'Fees',
      'startDate',
      'endDate',
      'Vendor',
      'status'
      ];
  
    }
    if (this.path == 'creator'){
      this.isCreator = true;
      this.displayedColumns = [
        'creator',
        'name',
      'code',
      'Days',
      'Training Hours',
      'Fees',
      'startDate',
      'endDate',
      'Vendor',
      'status'
      ];
    }
  }

  ngOnInit(){
    this.getAllCourses();
  }
  openFilterCard(){
    this.isFilter = !this.isFilter;
     }
     getFilterData(filters?: any) {
      // let filterText = this.filterName
      this._courseService.getAllCourses().subscribe(
        (response: any) => {
          this.courseData = response.docs;
          console.log(this.courseData);
          this.titles = this.courseData.map((doc: any) => doc.title);
          this.codes = this.courseData.map((doc: any) => doc.courseCode);
          this.creator = this.courseData.map((doc: any) => doc.creator);
          this.duration = this.courseData.map((doc: any) => doc.duration);
          this.startDate = this.courseData.map((doc: any) => doc.sessionStartDate);
          this.endDate = this.courseData.map((doc: any) => doc.sessionEndDate);
          this.status = this.courseData.map((doc: any) => doc.status);
        },
        (error) => {
        }
      );
    }
   // export table data in excel file
   exportExcel() {
    // key name with space add in brackets
    console.log("vv", this.courseData);
    const exportData: Partial<TableElement>[] =
      this.courseData.map((x: any) => ({
        'Course Name': x.title,
        'Course Code':x.courseCode,
        
        'Duration': x.training_hours,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  generatePdf() {
    const doc = new jsPDF();
    const headers = [[' Course Name','Duration']];
    console.log(this.courseData)
    const data = this.courseData.map((x:any) =>
      [x.title,
        x.training_hours,
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
    doc.save('AllCourses-list.pdf');
  }
  performSearch() {
    if(this.searchTerm){
    this.courseData = this.courseData?.filter((item: any) =>{
      console.log("data",item)
      const searchList = (item.title).toLowerCase();
      return searchList.indexOf(this.searchTerm.toLowerCase()) !== -1
    }


    // item.classId.courseId?.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    } else {
      this.getAllCourses();

    }
  }
  delete(id: string) {
    this.classService.getClassList({ courseId: id }).subscribe((classList: any) => {
      const matchingClasses = classList.docs.filter((classItem: any) => {
        return classItem.courseId && classItem.courseId.id === id;
      });
      if (matchingClasses.length > 0) {
        Swal.fire({
          title: 'Error',
          text: 'Classes have been registered with this course. Cannot delete.',
          icon: 'error',
        });
        return;
      }
      Swal.fire({
        title: "Confirm Deletion",
        text: "Are you sure you want to delete this  Course?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
      this._courseService.deleteCourse(id).subscribe(() => {
        this.getAllCourses();
        Swal.fire({
          title: 'Success',
          text: 'Course deleted successfully.',
          icon: 'success',
        });
      });
    }
    });
  
  });
    
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.courseData.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.courseData.renderedData.forEach((row: any) =>
          this.selection.select(row)
        );
  }
  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.getAllCourses();
  }
  private mapCategories(): void {
    this.coursePaginationModel.docs?.forEach((item) => {
      item.main_category_text = this.mainCategories.find((x) => x.id === item.main_category)?.category_name;
    });
  
    this.coursePaginationModel.docs?.forEach((item) => {
      item.sub_category_text = this.allSubCategories.find((x) => x.id === item.sub_category)?.category_name;
    });
  
  }
  getAllCourses(){
    this._courseService.getAllCoursesWithPagination().subscribe(response =>{
      console.log(response);
      this.courseData = response.data.docs;
      this.totalItems = response.data.totalDocs
      this.coursePaginationModel.docs = response.data.docs;
      this.coursePaginationModel.page = response.data.page;
      this.coursePaginationModel.limit = response.data.limit;
      this.coursePaginationModel.totalDocs = response.data.totalDocs;
    })
  }
  viewCourse(id:string) {
    this.route.navigate(['/admin/courses/course-view/'],{queryParams: {id:id,status:'active'}});
  }
// getAllCourse(){
//   this._courseService.getAllCourses({ ...this.coursePaginationModel, status: 'active' }).subscribe(response =>{
//    this.courseData = response.data.docs;
//    this.totalItems = response.data.totalDocs
//    this.coursePaginationModel.docs = response.data.docs;
//    this.coursePaginationModel.page = response.data.page;
//    this.coursePaginationModel.limit = response.data.limit;
//    this.coursePaginationModel.totalDocs = response.data.totalDocs;
//   })
// }
// pageSizeChange($event: any) {
//   this.coursePaginationModel.page = $event?.pageIndex + 1;
//   this.coursePaginationModel.limit = $event?.pageSize;
//   this.getAllCourse();
// }
// private mapCategories(): void {
//   this.coursePaginationModel.docs?.forEach((item) => {
//     item.main_category_text = this.mainCategories.find((x) => x.id === item.main_category)?.category_name;
//   });

//   this.coursePaginationModel.docs?.forEach((item) => {
//     item.sub_category_text = this.allSubCategories.find((x) => x.id === item.sub_category)?.category_name;
//   });

// }
// getCoursesList() {
//   this._courseService.getAllCourses({ ...this.coursePaginationModel, status: 'active' })
//     .subscribe(response => {
//       this.dataSource = response.data.docs;
//       this.totalItems = response.data.totalDocs
//       this.coursePaginationModel.docs = response.data.docs;
//       this.coursePaginationModel.page = response.data.page;
//       this.coursePaginationModel.limit = response.data.limit;
//       this.coursePaginationModel.totalDocs = response.data.totalDocs;
//       this.mapCategories();
//     }, (error) => {
//     }
//     )
// }
// delete(id: string) {
//   this.classService.getClassList({ courseId: id }).subscribe((classList: any) => {
//     const matchingClasses = classList.docs.filter((classItem: any) => {
//       return classItem.courseId && classItem.courseId.id === id;
//     });
//     if (matchingClasses.length > 0) {
//       Swal.fire({
//         title: 'Error',
//         text: 'Classes have been registered with this course. Cannot delete.',
//         icon: 'error',
//       });
//       return;
//     }
//     Swal.fire({
//       title: "Confirm Deletion",
//       text: "Are you sure you want to delete this  Course?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Delete",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//     this._courseService.deleteCourse(id).subscribe(() => {
//       this.getAllCourse();
//       Swal.fire({
//         title: 'Success',
//         text: 'Course deleted successfully.',
//         icon: 'success',
//       });
//     });
//   }
//   });

// });
  
// }

  // export table data in excel file
  // exportExcel() {
  //   // key name with space add in brackets
  //   console.log("vv", this.courseData);
  //   const exportData: Partial<TableElement>[] =
  //     this.courseData.map((x: any) => ({
  //       'Course Name': x.title,
  //       'Course Code':x.courseCode,
        
  //       'Duration': x.training_hours,
  //     }));

  //   TableExportUtil.exportToExcel(exportData, 'excel');
  // }
  // generatePdf() {
  //   const doc = new jsPDF();
  //   const headers = [[' Course Name','Duration']];
  //   console.log(this.courseData)
  //   const data = this.courseData.map((x:any) =>
  //     [x.title,
  //       x.training_hours,
  //   ] );
  //   //const columnWidths = [60, 80, 40];
  //   const columnWidths = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
  
  //   // Add a page to the document (optional)
  //   //doc.addPage();
  
  //   // Generate the table using jspdf-autotable
  //   (doc as any).autoTable({
  //     head: headers,
  //     body: data,
  //     startY: 20,
  
  
  
  //   });
  
  //   // Save or open the PDF
  //   doc.save('AllCourses-list.pdf');
  // }
  // performSearch() {
  //   if(this.searchTerm){
  //   this.courseData = this.courseData?.filter((item: any) =>{
  //     console.log("data",item)
  //     const searchList = (item.title).toLowerCase();
  //     return searchList.indexOf(this.searchTerm.toLowerCase()) !== -1
  //   }


  //   // item.classId.courseId?.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  //   } else {
  //     this.getAllCourse();

  //   }
  // }
  // private refreshTable() {
  //   this.paginator._changePageSize(this.paginator.pageSize);
  // }
  // removeSelectedRows() {
  //   const totalSelect = this.selection.selected.length;

  //   Swal.fire({
  //     title: "Confirm Deletion",
  //     text: "Are you sure you want to delete?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Delete",
  //     cancelButtonText: "Cancel",
  //   }).then((result) => {
  //     if (result.isConfirmed){
  //       this.selection.selected.forEach((item) => {
  //         const index: number = this.courseData.renderedData.findIndex(
  //           (d: MainCategory) => d === item
  //         );
  //         // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
  //         // this.exampleDatabase?.dataChange.value.splice(index, 1);
  //         this.refreshTable();
  //         this.selection = new SelectionModel<MainCategory>(true, []);
  //       });
  //       Swal.fire({
  //         title: 'Success',
  //         text: 'Record Deleted Successfully...!!!',
  //         icon: 'success',
  //         // confirmButtonColor: '#526D82',
  //       });
  //     }
  //   });
   
  //   // this.showNotification(
  //   //   'snackbar-danger',
  //   //   totalSelect + ' Record Delete Successfully...!!!',
  //   //   'bottom',
  //   //   'center'
  //   // );
  // }
}
