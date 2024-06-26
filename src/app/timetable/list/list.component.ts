import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { UnsubscribeOnDestroyAdapter } from '@shared/UnsubscribeOnDestroyAdapter';
import { ExamScheduleService } from '../exam-schedule.service'
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExamSchedule } from '../exam-schedule.model';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends UnsubscribeOnDestroyAdapter
implements OnInit
{
displayedColumns = [
  'courseName',
  'course Code',
  'start Date',
  'end Date',
  'time',
  'duration',
  // 'actions'
  
];
exampleDatabase?: ExamScheduleService;
dataSource!: ExampleDataSource;
selection = new SelectionModel<ExamSchedule>(true, []);
index?: number;
id?: number;
examSchedule?: ExamSchedule;

breadscrums = [
  {
    title: 'Schedule',
    items: ['Timetable'],
    active: 'Course Exam Schedule',
  },
];

constructor(
  public httpClient: HttpClient,
  public examScheduleService: ExamScheduleService,
  private router: Router
) {
  super();
}
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
@ViewChild(MatSort, { static: true }) sort!: MatSort;
@ViewChild('filter', { static: true }) filter!: ElementRef;

ngOnInit() {
  this.loadData();
}

public loadData() {
  this.exampleDatabase = new ExamScheduleService(this.httpClient);
  this.dataSource = new ExampleDataSource(
    this.exampleDatabase,
    this.paginator,
    this.sort
  );
  this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
    () => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  );
}
editCall(row: ExamSchedule) {
  this.id = row.id;
  this.router.navigate(['/timetable/course-exam-edit/' + this.id])

}
// delete(row: ExamSchedule){

// }
delete(row: ExamSchedule) {
  // this.id = row.id;
   Swal.fire({
     title: "Confirm Deletion",
     text: "Are you sure you want to delete this Exam Schedule?",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#d33",
     cancelButtonColor: "#3085d6",
     confirmButtonText: "Delete",
     cancelButtonText: "Cancel",
   }).then((result) => {
     if (result.isConfirmed) {
       this.examScheduleService.deleteExam(row.id).subscribe(
         () => {
           Swal.fire({
             title: "Deleted",
             text: "Exam Schedule deleted successfully",
             icon: "success",
           });
           this.loadData()
           //this.fetchCourseKits();
           //this.instructorData()
         },
         (error: { message: any; error: any; }) => {
           Swal.fire(
             "Failed to delete  Instructor",
             error.message || error.error,
             "error"
           );
         }
       );
     }
   });

 }

}
export class ExampleDataSource extends DataSource<ExamSchedule> {
filterChange = new BehaviorSubject('');
get filter(): string {
  return this.filterChange.value;
}
set filter(filter: string) {
  this.filterChange.next(filter);
}
filteredData: ExamSchedule[] = [];
renderedData: ExamSchedule[] = [];
constructor(
  public exampleDatabase: ExamScheduleService,
  public paginator: MatPaginator,
  public _sort: MatSort
) {
  super();
  // Reset to the first page when the user changes the filter.
  this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
}
/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<ExamSchedule[]> {
  // Listen for any changes in the base data, sorting, filtering, or pagination
  const displayDataChanges = [
    this.exampleDatabase.dataChange,
    this._sort.sortChange,
    this.filterChange,
    this.paginator.page,
  ];
  this.exampleDatabase.getAllExamSchedule();
  return merge(...displayDataChanges).pipe(
    map(() => {
      // Filter data
      this.filteredData = this.exampleDatabase.data
        .slice()
        .filter((examSchedule: ExamSchedule) => {
          const searchStr = (
            examSchedule.courseName +
            examSchedule.courseCode 
            // examSchedule.date +
            // examSchedule.time +
            // examSchedule.duration +
            // examSchedule.totalMarks
          ).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });
      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice().reverse());
      // Grab the page's slice of the filtered sorted data.
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      this.renderedData = sortedData.splice(
        startIndex,
        this.paginator.pageSize
      );
      return this.renderedData;
    })
  );
}
disconnect() {
  // disconnect
}
/** Returns a sorted copy of the database data. */
sortData(data: ExamSchedule[]): ExamSchedule[] {
  if (!this._sort.active || this._sort.direction === '') {
    return data;
  }
  return data.sort((a, b) => {
    let propertyA: number | string = '';
    let propertyB: number | string = '';
    switch (this._sort.active) {
      case 'id':
        [propertyA, propertyB] = [a.id, b.id];
        break;
      // case 'subject':
      //   [propertyA, propertyB] = [a.subject, b.subject];
        break;
      case 'class':
        [propertyA, propertyB] = [a.class, b.class];
        break;
      case 'date':
        [propertyA, propertyB] = [a.date, b.date];
        break;
    }
    const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
    return (
      (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
    );
  });
}
}

