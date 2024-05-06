import { Component } from '@angular/core';

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
  dataSource = [
    { title : "Student Registration", level : "1" , approver : "Admin"},
    { title : "Course Enrollment", level : "1", approver : "Admin"},
    { title : "Program Enrollment ", level : "1", approver : "Admin"},
    { title : "Budget Approval", level : "1", approver : "Approver 2"},
    { title : "Department Budget Approval", level : "1", approver : "Approver 2"},
    { title : "Traning Request Approval", level : "3", approver : "Approver 1, Approver 2, Approver 3"},
  ]
}
