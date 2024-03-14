import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseApprovalComponent } from './course-approval/course-approval.component';
import { ApproveListComponent } from './approve-list/approve-list.component';
const routes: Routes = [
  {
    path: 'course-approval',
    component: CourseApprovalComponent
  },
  {
    path:'courses-registered',
    component:ApproveListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule {}
