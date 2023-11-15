import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

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
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamScheduleRoutingModule {}
