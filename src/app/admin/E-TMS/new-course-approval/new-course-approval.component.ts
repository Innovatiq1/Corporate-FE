import { Component } from '@angular/core';

@Component({
  selector: 'app-new-course-approval',
  templateUrl: './new-course-approval.component.html',
  styleUrls: ['./new-course-approval.component.scss']
})
export class NewCourseApprovalComponent {

  breadscrums = [
    {
      title: 'New Course Approval',
      active: 'New Course Approval',
    },
  ];
  dataSource = [
    { courseName: 'Maintanance' , courseCode: 'M123' , mainCategory: 'Safety', subCategory: 'Security', fees:'200' },
    { courseName: 'Monitoring', courseCode: 'M56' , mainCategory: 'Security', subCategory: 'Policy', fees:'300'},
    { courseName: 'Finance', courseCode: 'F65' , mainCategory: 'Management', subCategory: 'Economics', fees:'400' },
     
  ];
}
