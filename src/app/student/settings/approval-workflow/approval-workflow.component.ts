import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursePaginationModel } from '@core/models/course.model';
import { SettingsService } from '@core/service/settings.service';
import { UtilsService } from '@core/service/utils.service';

@Component({
  selector: 'app-approval-workflow',
  templateUrl: './approval-workflow.component.html',
  styleUrls: ['./approval-workflow.component.scss']
})
export class ApprovalWorkflowComponent {
  displayedColumns = [
    
    'Title',
    'Approver',
    'Level',
    
  ];
  breadscrums = [
    {
      title: 'Questions',
      items: ['Automation'],
      active: 'Approval Workflow',
    },
  ];

  dataSource: any;
  coursePaginationModel!: Partial<CoursePaginationModel>;
  totalItems: any;
  pageSizeArr = this.utils.pageSizeArr;
  
  constructor(
    private settingsService: SettingsService,
    public utils: UtilsService, 
    private router: Router
  ) {
    this.coursePaginationModel = {};
  }

  ngOnInit(): void {
    this.getApprovalFlow();
  }

  getApprovalFlow(): void {
    this.settingsService.getApprovalFlow({ ...this.coursePaginationModel }).subscribe( (response) => {
          this.dataSource = response.data.docs;
          this.totalItems = response.data.totalDocs;
          this.coursePaginationModel.docs = response.data.docs;
          this.coursePaginationModel.page = response.data.page;
          this.coursePaginationModel.limit = response.data.limit;
        },
        (error) => {
          console.error('Failed to fetch approval flow:', error);
        }
      );
  }

  addNew() {
    this.router.navigate(['/student/settings/create-approval-flow']);
  }

}
