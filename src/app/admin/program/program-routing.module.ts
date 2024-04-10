
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramListComponent } from './program-list/program-list.component';
import { CreateProgramComponent } from './create-program/create-program.component';
// import { ScheduleClassComponent } from './schedule-class/schedule-class.component'
import { ProgaramCompletionListComponent } from './progaram-completion-list/progaram-completion-list.component';
import { ProgramKitComponent } from './program-kit/program-kit.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { CreateProgramKitComponent } from './program-kit/create-program-kit/create-program-kit.component';
import { EditProgramKitComponent } from './program-kit/edit-program-kit/edit-program-kit.component';
import { CreateTemplateComponent } from './program-kit/create-template/create-template.component';
import { ViewProgramComponent } from './view-program/view-program.component';
import { PendingProgramsComponent } from './program-list/pending-programs/pending-programs.component';
import { ApprovedProgramsComponent } from './program-list/approved-programs/approved-programs.component';
import { StudentPendingListComponent } from './student-pending-list/student-pending-list.component';
import { StudentApprovalListComponent } from './student-approval-list/student-approval-list.component';
import { ViewCompletionComponent } from './view-completion/view-completion.component';
import { ViewStudentPendingListComponent } from './view-student-pending-list/view-student-pending-list.component';

const routes: Routes = [
  {
    path:'program-list/program', 
    component:ProgramListComponent
  },
  {
    path:'program-list/creator', 
    component:ProgramListComponent
  },
  {
    path:'submitted-program/approved-program', 
    component:ApprovedProgramsComponent
  },
  {
    path:'submitted-program/pending-program', 
    component:PendingProgramsComponent
  },
  {
    path:'student-program/approved-program', 
    component:StudentApprovalListComponent
  },
  {
      path:'student-program/pending-program', 
      component: StudentPendingListComponent
    },
    {
      path:'view-completion-list/:id',
      component:ViewCompletionComponent
    },
    {
      path:'view-approved-program/:id',
      component:ViewCompletionComponent
    },
    {
      path:'view-pending-program/:id',
      component:ViewStudentPendingListComponent
    },
  {
    path:'create-program', 
    component:CreateProgramComponent
  },
  {
    path:'edit-program', 
    component:CreateProgramComponent
  },
  {
    path:'edit-program/:id', 
    component:CreateProgramComponent
  },
  {
    path:'create-class', 
    component:CreateClassComponent
  },
  {
    path:'edit-class/:id', 
    component:CreateClassComponent
  },

  {
    path:'student-program/completed-program', 
    component:ProgaramCompletionListComponent
  },
  {
    path:'program-kit', 
    component:ProgramKitComponent
  },
  {
    path:'create-program-kit', 
    component:CreateProgramKitComponent
  },
  {
    path:'edit-program-kit/:id', 
    component:EditProgramKitComponent
  },
  {
    path:'view-program-kit/:id', 
    component:EditProgramKitComponent
  },
  {
    path:'program-kit-template', 
    component:CreateTemplateComponent
  },
  {
    path:'view-program', 
    component:ViewProgramComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
