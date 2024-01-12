/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { CoursePaginationModel } from '@core/models/course.model';
import { EtmsService } from '@core/service/etms.service';
import { UtilsService } from '@core/service/utils.service';

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.scss']
})
export class AllRequestComponent {

  breadscrums = [
    {
      title: 'Approval Work Flow',
      active: 'All Request',
    },
  ];
  SourceData:any;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  constructor(public empService: EtmsService, public utils: UtilsService) { 
    this.coursePaginationModel = {};
  }


  ngOnInit() {
    this.getAllRequests();
  }

  getAllRequests(){
    this.empService.getAllRequests({...this.coursePaginationModel}).subscribe((res) => {
      this.SourceData = res.data.docs.docs;
      this.totalItems = res.data.totalDocs;
      this.coursePaginationModel.docs = res.data.docs;
      this.coursePaginationModel.page = res.data.page;
      this.coursePaginationModel.limit = res.data.limit;
    })
  }

  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.getAllRequests();
  }

}
