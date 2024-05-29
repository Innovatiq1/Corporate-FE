import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { CreateAllUsersComponent } from './create-all-users/create-all-users.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AboutStudentComponent } from './about-student/about-student.component';
import { AllTeachersComponent } from './all-teachers/all-teachers.component';
import { AboutTeacherComponent } from './about-teacher/about-teacher.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';

const routes: Routes = [
  {
    path: 'all-users',
    component: AllUsersComponent,
  },
  // {
  //   path: 'all-courses',
  //   component: AllCourseComponent,
  // },
  {
    path: 'create-all-users',
    component: CreateAllUsersComponent,
  },
  {
    path: 'view-all-users/:id',
    component: ViewUsersComponent,
  },
  {
    path: 'edit-all-users/:id',
    component: ViewUsersComponent,
  },
  {
    path: 'staff',
    component: AllStudentsComponent,
  },
  {
    path: 'add-student',
    component: AddStudentComponent,
  },
  {
    path: 'view-student',
    component: AboutStudentComponent,
  },
  {
    path: 'managers',
    component: AllTeachersComponent,
  },
  {
    path: 'view-instructor',
    component: AboutTeacherComponent,
  },
  {
    path: 'edit-instructor/:id',
    component: EditTeacherComponent,
  },
  {
    path: 'add-instructor',
    component: AddTeacherComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
