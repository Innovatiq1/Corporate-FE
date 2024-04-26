import { Component, OnInit } from '@angular/core';
import { CoursePaginationModel } from '@core/models/course.model';
import { CourseService } from '@core/service/course.service';
import { UtilsService } from '@core/service/utils.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{
  breadscrums = [
    {
      title: 'Reoprts',
      items: ['Reports'],
      active: 'Report',
    },
  ];
  displayedColumns: string[] = [
    // 'select',
    'Report Generated',
    'Download',
    
  ];
  dataSource : any;
  pageSizeArr = this.utils.pageSizeArr;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;

  constructor(
    private courseService: CourseService,
    private utils: UtilsService,
   ) {
    this.coursePaginationModel = {};
    
     }

  ngOnInit(): void {
  this.getReportsList();
  }

  getReportsList(filters?: any) {
    this.courseService.getAllSavedReports({...this.coursePaginationModel}).subscribe(
      (response: any) => {
        this.dataSource = response.data.docs;
        this.totalItems = response.data.totalDocs;
        this.coursePaginationModel.docs = response.data.docs;
        this.coursePaginationModel.page = response.data.page;
        this.coursePaginationModel.limit = response.data.limit;
        this.coursePaginationModel.totalDocs = response.data.totalDocs;
      },
      
    );
  }
  pageSizeChange($event: any) {
    this.coursePaginationModel.page = $event?.pageIndex + 1;
    this.coursePaginationModel.limit = $event?.pageSize;
    this.getReportsList();
  }
}
