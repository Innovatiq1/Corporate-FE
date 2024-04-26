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
import { forkJoin } from 'rxjs';
import { UserService } from '@core/service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    'status',
    'code',
    'creator',
    'Days',
    'Training Hours',
    'Fees',
    'startDate',
    'endDate',
    'Vendor',

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
  pagination: any;
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
  courseList: any;
  selectedCourses: any = [];
  limit: any = 10
  filter = false;
  vendors: any;
  selectedVendors: any = [];
  selectedStatus: any = [];
  users: any;
  selectedCreators: any = [];
  filterForm: FormGroup

  constructor(public _courseService: CourseService, private route: Router, private classService: ClassService,
    private userService: UserService, private fb: FormBuilder) {
    // constructor
    this.coursePaginationModel = { limit: 10 };
    let urlPath = this.route.url.split('/')
    // this.editUrl = urlPath.includes('edit-program');
    this.path = urlPath[urlPath.length - 1];
    this.filterForm = this.fb.group({
      course: ['', []],
      creator: ['', []],
      // startDate: ['', []],
      // endDate: ['', []],
      status: ['', []],
      vendor: ['', []]

    })

    if (this.path == 'course') {
      this.isCourse = true;
      this.displayedColumns = [
        'name',
        'status',
        'code',
        'creator',
        'Days',
        'Training Hours',
        'Fees',
        'startDate',
        'endDate',
        'Vendor',

      ];

    }
    if (this.path == 'creator') {
      this.isCreator = true;
      this.displayedColumns = [
        'creator',
        'status',
        'name',
        'code',
        'Days',
        'Training Hours',
        'Fees',
        'startDate',
        'endDate',
        'Vendor',

      ];
    }
  }

  ngOnInit() {
    this.getAllCourses();
    this.getAllVendorsAndUsers();
    forkJoin({
      courses: this.classService.getAllCourses(),
    }).subscribe((response) => {
      this.courseList = response.courses.reverse();
    });

  }

  getAllVendorsAndUsers() {
    this._courseService.getVendor().subscribe((response: any) => {
      this.vendors = response.reverse();
    })
    this.userService.getAllUsers().subscribe((response: any) => {
      this.users = response?.results;
    });

  }



  openFilterCard() {
    this.isFilter = !this.isFilter;
  }
  // export table data in excel file
  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.courseData.map((x: any) => ({
        'Course Name': x.title,
        'Course Code': x.courseCode,

        'Duration': x.training_hours,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  onSelectionChange(event: any, field: any) {
    if (field == 'course') {
      this.selectedCourses = event.value;
    }
    if (field == 'vendor') {
      this.selectedVendors = event.value;
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
    this.getAllCourses()
  }
  applyFilter() {
    let body: any = {};
    if (this.selectedCourses.length > 0) {
      body.title = this.selectedCourses
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

    this._courseService.getFilteredCourseData(body, { ...this.coursePaginationModel }).subscribe(response => {
      this.courseData = response.data.docs;
      this.totalItems = response.data.totalDocs
      this.filter = true;
      this.coursePaginationModel.docs = response.data.docs;
      this.coursePaginationModel.page = response.data.page;
      this.coursePaginationModel.limit = response.data.limit;
      this.coursePaginationModel.totalDocs = response.data.totalDocs;

    })

  }
  generatePdf() {
    const doc = new jsPDF();
    const headers = [[' Course Name', 'Duration']];
    console.log(this.courseData)
    const data = this.courseData.map((x: any) =>
      [x.title,
      x.training_hours,
      ]);
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
    if (this.searchTerm) {
      this.courseData = this.courseData?.filter((item: any) => {
        console.log("data", item)
        const searchList = (item.title).toLowerCase();
        return searchList.indexOf(this.searchTerm.toLowerCase()) !== -1
      }


        // item.classId.courseId?.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.getAllCourses();

    }
  }
  viewActiveProgram(id: string, status: string): void {
    this.route.navigate(['/admin/courses/view-course/', "data.id"]);
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
    if (this.filter) {
      this.applyFilter()
    } else {
      this.getAllCourses();
    }
  }
  private mapCategories(): void {
    this.coursePaginationModel.docs?.forEach((item) => {
      item.main_category_text = this.mainCategories.find((x) => x.id === item.main_category)?.category_name;
    });

    this.coursePaginationModel.docs?.forEach((item) => {
      item.sub_category_text = this.allSubCategories.find((x) => x.id === item.sub_category)?.category_name;
    });

  }
  getAllCourses() {
    this._courseService.getAllCoursesWithPagination().subscribe(response => {
      this.courseData = response.data.docs;
      this.totalItems = response.data.totalDocs
      this.coursePaginationModel.docs = response.data.docs;
      this.coursePaginationModel.page = response.data.page;
      this.coursePaginationModel.limit = response.data.limit;
      this.coursePaginationModel.totalDocs = response.data.totalDocs;
    })
  }
  viewCourse(id: string) {
    this.route.navigate(['/admin/courses/course-view/'], { queryParams: { id: id, status: 'active' } });
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
