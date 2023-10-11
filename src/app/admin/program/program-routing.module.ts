
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramListComponent } from './program-list/program-list.component';
import { CreateProgramComponent } from './create-program/create-program.component';
import { ScheduleClassComponent } from './schedule-class/schedule-class.component'
import { StudentApprovalListComponent } from './student-approval-list/student-approval-list.component';
import { ProgaramCompletionListComponent } from './progaram-completion-list/progaram-completion-list.component';
import { ProgramKitComponent } from './program-kit/program-kit.component';
import { ProgramApprovalListComponent } from './program-approval-list/program-approval-list.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { CreateProgramKitComponent } from './program-kit/create-program-kit/create-program-kit.component';
import { EditProgramKitComponent } from './program-kit/edit-program-kit/edit-program-kit.component';
import { CreateTemplateComponent } from './program-kit/create-template/create-template.component';

const routes: Routes = [
  {
    path:'program-list', 
    component:ProgramListComponent
  },
  {
    path:'schedule-class', 
    component:ScheduleClassComponent
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
    path:'student-approve-list', 
    component:StudentApprovalListComponent
  },
  {
    path:'program-completion-list', 
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
    path:'program-approve-list', 
    component:ProgramApprovalListComponent
  },
  {
    path:'program-kit-template', 
    component:CreateTemplateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
