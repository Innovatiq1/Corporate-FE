import { Component } from '@angular/core';

@Component({
  selector: 'app-approval-workflow',
  templateUrl: './approval-workflow.component.html',
  styleUrls: ['./approval-workflow.component.scss']
})
export class ApprovalWorkflowComponent {
  displayedColumns = [
    
    'Title',
    'Level',
  ];
  breadscrums = [
    {
      title: 'Questions',
      items: ['Automation'],
      active: 'Approval Workflow',
    },
  ];
  dataSource = [
    { title : "Student Registration", level : "1"},
    { title : "Course Enrollment", level : "1"},
    { title : "Program Enrollment ", level : "1"},
    { title : "Budget Approval", level : "1"},
    { title : "Department Budget Approval", level : "1"},
    { title : "Traning Request Approval", level : "3"},
  ]
}
