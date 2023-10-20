import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { ComponentsModule } from "../../shared/components/components.module";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';



@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        ComponentsModule,SharedModule,OwlDateTimeModule,OwlNativeDateTimeModule
    ]
})
export class ScheduleClassModule { }
