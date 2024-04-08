import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseApprovalComponent } from './course-approval/course-approval.component';
import { ApproveListComponent } from './approve-list/approve-list.component';
// import { StudentApprovalListComponent } from './student-approval-list/student-approval-list.component';
import { ProgramApprovalListComponent } from './program-approval-list/program-approval-list.component';
import { TrainingApprovalReqComponent } from './training-approval-req/training-approval-req.component';
const routes: Routes = [
  {
    path: 'course-approval',
    component: CourseApprovalComponent
  },
  {
    path:'courses-registered',
    component:ApproveListComponent
  },
  // {
  //   path:'programs-registered', 
  //   component:StudentApprovalListComponent
  // },
  {
    path:'program-approval', 
    component:ProgramApprovalListComponent
  },
  {
    path:'training-approval-req', 
    component:TrainingApprovalReqComponent
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule {}
