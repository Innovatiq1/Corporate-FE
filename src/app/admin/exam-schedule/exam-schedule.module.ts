import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from "./list/list.component"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamScheduleRoutingModule } from './exam-schedule-routing.module';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { ExamScheduleService } from './exam-schedule.service';
import { AddComponent } from './add/add.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { EditComponent } from './edit/edit.component';




@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExamScheduleRoutingModule,
    ComponentsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [ExamScheduleService],
})
export class ExamScheduleModule { }
