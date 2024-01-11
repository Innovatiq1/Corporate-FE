import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { EtmsService } from '@core/service/etms.service';
import { UtilsService } from '@core/service/utils.service';

@Component({
  selector: 'app-employee-status',
  templateUrl: './employee-status.component.html',
  styleUrls: ['./employee-status.component.scss']
})
export class EmployeeStatusComponent {
  displayedColumns: string[] = [
    'course',
    'payment',
    'approved on',
    'approval stage',
    'status',
    'reason'];
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;



  selection = new SelectionModel<any>(true, []);
  dataSource :any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  breadscrums = [
    {
      title: 'Approval Work Flow ',
      // items: ['Extra'],
      active: 'Employee Status',
    },
  ];

constructor(private router:Router,private etmsService: EtmsService,public utils: UtilsService){
  this.coursePaginationModel = {};

}
  ngOnInit() {
    this.getAllRequestsByEmployeeId()  
  }


  createReq(){
this.router.navigate(['/admin/approval-work-flow/create-req'])
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row: any) =>
          this.selection.select(row)
        );
  }
  

  getAllRequestsByEmployeeId(){
    let employeeId = localStorage.getItem('id')
    this.etmsService.getAllRequestsByEmployeeId(employeeId).subscribe(response =>{
     this.dataSource = response.data.docs;
     this.totalItems = response.data.totalDocs;
     this.coursePaginationModel.docs = response.docs;
    this.coursePaginationModel.page = response.page;
    this.coursePaginationModel.limit = response.limit;
    }, error => {
    });
  }

  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.getAllRequestsByEmployeeId();
  }


}
