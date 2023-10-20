import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { CreateStudentComponent } from './create-student/create-student.component';
const routes: Routes = [
  {
    path: 'testimonials-student' ,
    component: StudentComponent
  },
  {
    path: 'create-student',
    component:  CreateStudentComponent
  },
  {
    path: 'edit-student/:id',
    component: CreateStudentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestimonialsRoutingModule {}
