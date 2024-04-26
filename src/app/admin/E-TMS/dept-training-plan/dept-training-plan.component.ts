import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@core/service/auth.service';
import Swal from 'sweetalert2';
export interface PeriodicElement {

  // no: number;
  name: string ,
  level: string,
  cost: number,
  date: string
}
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};

const ELEMENT_DATA: PeriodicElement[] = [
  {
    // no: 1,
    name: 'Sales Training and Strategy' ,
    level: 'Intermediate',
    cost: 205,
    date: formatDate(new Date('11-25-2023')),
  },
  {
    // no: 2,
    name: 'Customer Relationship Management' ,
    level: 'Advanced',
    cost: 230,
    date: formatDate(new Date('11-22-2023')),
  },
  {
    // no: 3,
    name: 'Negotiation Expert' ,
    level: 'Beginner',
    cost: 120,
    date: formatDate(new Date('11-18-2023')),
  },
  {
    // no: 4,
    name: 'Business Strategy' ,
    level: 'Intermediate',
    cost: 130,
    date: formatDate(new Date('11-18-2023')),
  },
  {
    // no: 5,
    name: 'Sales Executive' ,
    level: 'Advanced',
    cost: 310,
    date: formatDate(new Date('11-11-2023')),
  }
];

@Component({
  selector: 'app-dept-training-plan',
  templateUrl: './dept-training-plan.component.html',
  styleUrls: ['./dept-training-plan.component.scss']
})
export class DeptTrainingPlanComponent implements OnInit{
  displayedColumns: string[] = [
    'select',
    'Course Name',
    'Training Level',
    'Training Cost',
    'Date',
    'Details',
  ];
  create_btn:boolean = false;
  titles!:string;
  selection = new SelectionModel<any>(true, []);
  dataSource = ELEMENT_DATA;
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  breadscrums = [
    {
      title: 'Over All Budget',
      // items: ['Extra'],
      active: 'Department Training Plan',
    },
  ];
  constructor( private authService: AuthService,) {
    // constructor
  }
  ngOnInit() {
    this.dataSource2.paginator = this.paginator;
    // const userRole = this.authService.currentUserValue.user.role;
    //  if(userRole === 'RO' ){
    //   this.titles = ' Training Plan';
    // } else if(userRole === 'Training Adminstrator'){
    //   this.titles = 'Notification Of Training Plan';
    // }else if(userRole === 'Director'){
    //   this.titles = 'Approval Training Plan';
    // }
  }
  approveCourse(): void {
    Swal.fire({
      title: 'Success',
      text: 'Training approved successfully.',
      icon: 'success',
      // confirmButtonColor: '#526D82',
    });
  }
  isAnyRowSelected(): boolean {
    return this.selection.hasValue();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource2.data.length;
    return numSelected === numRows;

  }

  // Select or deselect all rows
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource2.data.forEach(row => this.selection.select(row));
  }

}
