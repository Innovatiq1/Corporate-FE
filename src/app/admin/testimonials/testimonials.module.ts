import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TestimonialsRoutingModule } from './testimonials-routing.module';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentComponent } from './student/student.component';


@NgModule({
  declarations: [
   

  
    
              CreateStudentComponent,
                               StudentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TestimonialsRoutingModule,
    ComponentsModule,
    SharedModule,
    ModalModule.forRoot()
  ],
})
export class TestimonialsModule {}
