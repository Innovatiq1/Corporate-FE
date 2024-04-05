import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AboutStudentComponent } from './about-student/about-student.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';

const routes: Routes = [
  {
    path: 'add-student',
    component: AddStudentComponent,
  },
  {
    path: 'edit-student',
    component: EditStudentComponent,
  },
  {
    path: 'view-student',
    component: AboutStudentComponent,
  },
  {
    path: 'student-attendance',
    component: StudentAttendanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
