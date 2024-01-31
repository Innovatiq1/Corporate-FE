import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { EtmsService } from '@core/service/etms.service';
import { UtilsService } from '@core/service/utils.service';

@Component({
  selector: 'app-new-course-request',
  templateUrl: './new-course-request.component.html',
  styleUrls: ['./new-course-request.component.scss']
})
export class NewCourseRequestComponent {
  displayedColumns: string[] = [
    'ID',
    'course',
    'vendor',
    'created at',
    'trainingadmin approved on',
    'reason'];
  
  breadscrums = [
    {
      title: 'New Course Request ',
      // items: ['Extra'],
      active: 'New Course Request',
    },
  ];

  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;


  id: any;
  selection = new SelectionModel<any>(true, []);
  dataSource :any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(private router:Router,private etmsService: EtmsService,public utils: UtilsService){
    this.coursePaginationModel = {};
  
  }
    ngOnInit() {
      this.getAllRequestsByEmployeeId()  
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
      let employeeStatus = 'inactive';
      this.etmsService.getNewRequestsByEmployeeId({...this.coursePaginationModel,employeeStatus,employeeId}).subscribe(response =>{
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
  // copy(id: string){
  //   this.router.navigate(['/admin/e-tms/copy-request'],{queryParams:{id : id, action : "copy"}})
  // }
  // edit(id: string){
  //   this.router.navigate(['/admin/e-tms/edit-request'],{queryParams:{id : id, action : "edit"}})
  // }
}
