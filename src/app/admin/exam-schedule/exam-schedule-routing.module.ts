import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ProgramExamScheduleComponent } from './program-exam-schedule/program-exam-schedule.component';

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
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamScheduleRoutingModule {}
