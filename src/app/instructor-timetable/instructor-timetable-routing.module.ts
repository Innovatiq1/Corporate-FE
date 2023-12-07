import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InstructorTimetableComponent } from './instructor-timetable.component';
import { ProgramTimetableComponent } from './program-timetable/program-timetable.component';


const routes :Routes=[
  {
    path: 'instrutor-course-timetable',
    component: InstructorTimetableComponent
},
{
  path: 'instrutor-program-timetable',
  component: ProgramTimetableComponent
}

  
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorTimetableRoutingModule { }
