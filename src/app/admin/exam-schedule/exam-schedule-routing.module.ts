import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ProgramExamScheduleComponent } from './program-exam-schedule/program-exam-schedule.component';
import { CreateProgramExamScheduleComponent } from './create-program-exam-schedule/create-program-exam-schedule.component';
import { EditProgramExamScheduleComponent } from './edit-program-exam-schedule/edit-program-exam-schedule.component';

const routes: Routes = [
  {
    path: 'exam-schedule',
    component: ListComponent
  },
  {
    path: 'exam-schedule-add',
    component: AddComponent
  },
  {
    path: 'exam-schedule-edit/:id',
    component: EditComponent
  },
  {
    path: 'program-exam',
    component: ProgramExamScheduleComponent
  },
  {
    path: 'program-exam-add',
    component: CreateProgramExamScheduleComponent
  },
  {
    path: 'program-exam-edit/:id',
    component: EditProgramExamScheduleComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamScheduleRoutingModule {}
